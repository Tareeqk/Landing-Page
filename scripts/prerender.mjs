// scripts/prerender.mjs
//
// Runs after `vite build`. This is a pure client-rendered React app —
// index.html ships an empty <div id="root">, and titles/meta/schema are
// injected by react-helmet-async only after JS executes. Crawlers that
// don't run JS (GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User) see none of
// that. This script boots a headless Chrome against the built `dist/`,
// visits every route from site-routes.mjs, waits for the app to actually
// render, and writes the resulting HTML to dist/<route>/index.html so
// those routes are served as plain static files — no JS execution needed.
//
// Real users are unaffected: the same JS bundle still loads and hydrates
// on top of this markup (see src/main.jsx — hydrateRoot() reuses this
// exact DOM instead of throwing it away and rebuilding from scratch).

import { preview } from 'vite';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllPages } from './site-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const distDir = path.join(root, 'dist');

const server = await preview({
  root,
  preview: { port: 4174, host: '127.0.0.1', strictPort: true },
});
const baseUrl = server.resolvedUrls.local[0];

// Vercel's build image doesn't have the shared libraries (libnspr4,
// libnss3, etc.) that a locally-installed `puppeteer` Chrome needs, so its
// launch fails there with "error while loading shared libraries". On
// Vercel (and any other serverless-style build environment), swap in
// `@sparticuz/chromium` — a Chromium build compiled specifically for that
// sandbox — driven through `puppeteer-core`. Everywhere else (local dev,
// the cPanel deploy build), keep using regular `puppeteer` with its
// bundled Chrome, unchanged.
const isServerlessBuild = !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

let browser;
if (isServerlessBuild) {
  const [{ default: chromium }, { default: puppeteerCore }] = await Promise.all([
    import('@sparticuz/chromium'),
    import('puppeteer-core'),
  ]);
  browser = await puppeteerCore.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
} else {
  const { default: puppeteer } = await import('puppeteer');
  // GitHub Actions' Ubuntu runners restrict the user namespaces Chrome's
  // sandbox needs, so launch fails with "No usable sandbox" there. The runner
  // is a throwaway VM building our own pages, so disabling the sandbox is safe
  // in CI; local builds keep the default.
  browser = await puppeteer.launch({
    headless: true,
    args: process.env.CI ? ['--no-sandbox', '--disable-setuid-sandbox'] : [],
  });
}
const page = await browser.newPage();

const pages = getAllPages();
let ok = 0;
const failed = [];

for (const { path: route } of pages) {
  const target = new URL(route, baseUrl).toString();
  try {
    await page.goto(target, { waitUntil: 'networkidle0', timeout: 30_000 });

    // networkidle0 can fire before React's post-fetch re-render (i18next's
    // http backend resolves async) — wait for real, translated content
    // before snapshotting.
    await page.waitForFunction(
      () => {
        const h1 = document.querySelector('h1');
        return !!h1 && h1.textContent.trim().length > 0;
      },
      { timeout: 15_000 }
    );

    // The homepage H1 (LandingPage.jsx's TypingTitle) types out one phrase
    // at a time character-by-character and cycles forever -- whatever
    // partial string it happens to be mid-typing when Chrome takes this
    // snapshot gets baked permanently into the static HTML every crawler
    // and pre-hydration visitor sees (was landing as "Car RCar Recovery,
    // Towing Service..." -- the partial ".tk-typing-text" content butted
    // up against the always-complete ".tk-visually-hidden" fallback right
    // after it, with no separator between them). The hidden span already
    // carries the full, correct text for screen readers/SEO -- copy it
    // into the visible span, promote that span to be the sole accessible
    // copy (it's aria-hidden by default since the animation is normally
    // decorative), and drop both the cursor and the now-redundant hidden
    // span. Removing the hidden span matters: a naive text-only scraper
    // doesn't respect aria-hidden/visually-hidden CSS, so leaving both
    // spans populated produced the phrase twice back-to-back in the
    // static H1 text instead of once.
    await page.evaluate(() => {
      document.querySelectorAll('.tk-hero__title--typing').forEach((h1) => {
        const full = h1.querySelector('.tk-visually-hidden');
        const typing = h1.querySelector('.tk-typing-text');
        const cursor = h1.querySelector('.tk-typing-cursor');
        if (full && typing) {
          typing.textContent = full.textContent;
          typing.removeAttribute('aria-hidden');
          full.remove();
        }
        if (cursor) cursor.remove();
      });

      // The two-phase mount described above (an early render with
      // fallback/default values, settling into the real per-route values
      // once route params and i18next's async-loaded translations
      // resolve) doesn't just duplicate <title> -- it leaves an earlier,
      // stale copy of EVERY Helmet-managed head tag sitting next to the
      // correct one: <link rel="canonical">, the hreflang alternates,
      // meta description/robots, og:*/twitter:*, and the JSON-LD schema
      // scripts. Since the stale copy is always the first one committed,
      // this was baking the *previous* render's canonical/hreflang/schema
      // into every route's static HTML alongside the correct one -- e.g.
      // every non-home page shipped two <link rel="canonical"> tags, one
      // pointing at itself and one still pointing at "/en/" (GSC's "Google
      // chose a different canonical than user" reports on tareeqk.ae were
      // Google resolving that exact conflict on hundreds of pages).
      // Same fix as <title> above, generalized: for each tag family, keep
      // only the last element sharing its identity key (the attribute
      // that makes two tags "the same slot" -- e.g. two hreflang links
      // are the same slot only if they share an hreflang value; two
      // JSON-LD scripts are the same slot only if they describe the same
      // schema.org @type) and drop everything earlier in that group.
      const dedupeByKey = (selector, keyFn) => {
        const seen = new Map();
        document.head.querySelectorAll(selector).forEach((el) => {
          const key = keyFn(el);
          if (key == null) return;
          if (seen.has(key)) seen.get(key).remove();
          seen.set(key, el);
        });
      };

      // <title> is the one tag where "keep the last" is WRONG. Helmet
      // inserts its route-specific <title> BEFORE the static fallback that
      // index.html ships, so the DOM ends up as [route title, fallback].
      // Keeping the last one baked the homepage fallback title into every
      // route's static HTML (all 43 /en/ pages, plus /ar/ and /ur/, had
      // the identical "Car Recovery in Dubai | 24/7 Towing & Roadside
      // Assistance" title for any crawler that doesn't run JS).
      // document.title always reads the FIRST <title> in the document,
      // which is Helmet's, so use it as the source of truth and rebuild a
      // single <title> from it.
      {
        const routeTitle = document.title;
        document.head.querySelectorAll('title').forEach((el) => el.remove());
        const titleEl = document.createElement('title');
        titleEl.textContent = routeTitle;
        document.head.prepend(titleEl);
      }

      // index.html carries Google's standard <script async src=".../gtag/js?id=G-N8F28JJFW1">
      // in the page source (so Google Ads / Tag Assistant can detect it). At
      // runtime the Google tag itself also appends extra gtag/js <script>
      // elements (e.g. ...?id=AW-...&cx=c&gtm=...) for the other destinations.
      // Serializing the live DOM would bake those into the static file, so the
      // real page would load gtag.js twice. Keep ONLY the first, exact, authored
      // tag and drop everything else.
      {
        const AUTHORED_GTAG = 'https://www.googletagmanager.com/gtag/js?id=G-N8F28JJFW1';
        let keptGtag = false;
        document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').forEach((el) => {
          if (!keptGtag && el.getAttribute('src') === AUTHORED_GTAG) { keptGtag = true; return; }
          el.remove();
        });
      }

      dedupeByKey('link[rel="canonical"]', () => 'canonical');
      dedupeByKey('link[rel="alternate"][hreflang]', (el) => el.getAttribute('hreflang'));
      dedupeByKey('meta[name="description"]', () => 'description');
      dedupeByKey('meta[name="robots"]', () => 'robots');
      dedupeByKey('meta[property^="og:"]', (el) => el.getAttribute('property'));
      dedupeByKey('meta[name^="twitter:"]', (el) => el.getAttribute('name'));
      // Link-preview crawlers (WhatsApp, Facebook, iMessage, Slack) only read
      // the start of the document. The runtime-injected <style> blocks from
      // lazily loaded components land in <head> before Helmet's tags, which
      // pushed og:title/description/image ~75KB down the file. Hoist the
      // social/SEO tags to sit right after <title> so a crawler sees them
      // immediately. Order among them is preserved.
      {
        const titleEl = document.head.querySelector('title');
        const hoist = [...document.head.querySelectorAll(
          'meta[name="description"], meta[name="robots"], link[rel="canonical"], meta[property^="og:"], meta[name^="twitter:"]'
        )];
        let anchor = titleEl;
        for (const el of hoist) {
          anchor.after(el);
          anchor = el;
        }
      }

      dedupeByKey('script[type="application/ld+json"]', (el) => {
        try {
          const type = JSON.parse(el.textContent)['@type'];
          return Array.isArray(type) ? type.slice().sort().join('+') : String(type);
        } catch {
          return el.textContent;
        }
      });
    });

    // page.content() serializes the LIVE DOM — by this point Chrome has
    // already loaded the Google Fonts stylesheet and fired its onload
    // handler, which flips that <link>'s media from "print" to "all" (see
    // the loadCSS pattern in index.html). Serializing that post-load state
    // bakes a permanently render-blocking media="all" into the static file
    // every real visitor gets, silently undoing the whole point of the
    // non-blocking font trick. Reset it back to the pre-load state before
    // writing to disk — this is the one <head> tag that must stay exactly
    // as authored rather than reflect the rendered-page snapshot.
    const html = (await page.content()).replace(
      /(<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2\?family=Noto\+Kufi\+Arabic[^"]*")\s+media="all"(\s+onload=)/,
      '$1 media="print"$2',
    );
    const outDir = route === '/' ? distDir : path.join(distDir, route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), html);
    ok++;
  } catch (err) {
    failed.push({ route, error: err.message });
  }
}

// Soft-404 fix: an unmatched URL was returning a 200 with the *homepage's*
// prerendered HTML and "index, follow" -- NotFound.jsx does set noindex via
// Helmet, but only after JS runs, so any crawler or curl hitting a dead or
// misspelled URL saw an indexable homepage duplicate instead of a real 404.
// Prerender the NotFound page once, from a route guaranteed not to match
// any real page (see STATIC_PAGES/SERVICE_PAGES/LOCATION_PAGES in
// site-routes.mjs), and ship it as dist/404.html for public/.htaccess's
// `ErrorDocument 404` to serve. ErrorDocument keeps the real 404 status
// code (unlike a redirect), and NotFound.jsx's own Helmet-set noindex tag
// bakes into this static file the same way every other route's meta does.
try {
  const target = new URL('/en/__page-not-found__', baseUrl).toString();
  await page.goto(target, { waitUntil: 'networkidle0', timeout: 30_000 });
  await page.waitForFunction(
    () => {
      const h1 = document.querySelector('h1');
      return !!h1 && h1.textContent.trim().length > 0;
    },
    { timeout: 15_000 }
  );
  const html = (await page.content()).replace(
    /(<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com\/css2\?family=Noto\+Kufi\+Arabic[^"]*")\s+media="all"(\s+onload=)/,
    '$1 media="print"$2',
  );
  await writeFile(path.join(distDir, '404.html'), html);
  console.log('Prerendered dist/404.html');
} catch (err) {
  console.error(`404 page prerender failed — ${err.message}`);
  process.exitCode = 1;
}

await browser.close();
await new Promise((resolve) => server.httpServer.close(resolve));

console.log(`Prerendered ${ok}/${pages.length} routes.`);
if (failed.length) {
  console.error(`${failed.length} route(s) failed:`);
  for (const f of failed) console.error(`  ${f.route} — ${f.error}`);
  process.exitCode = 1;
}
