// scripts/verify-build.mjs
//
// Sanity-checks dist/ after `yarn build`, before anything is uploaded. Exits
// non-zero (failing the deploy workflow) if the build has regressed in a way
// that would hurt SEO or break the site. Each check below guards against a
// problem this project has actually had.

import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getAllPages, LANGS, STATIC_PAGES, SERVICE_PAGES, LOCATION_PAGES, BLOG_POST_SLUGS } from './site-routes.mjs';

const dist = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const problems = [];
const fail = (msg) => problems.push(msg);
const exists = (p) => access(p).then(() => true, () => false);

for (const f of ['index.html', '404.html', '.htaccess', 'sitemap.xml', 'robots.txt']) {
  if (!(await exists(path.join(dist, f)))) fail(`dist/${f} is missing`);
}
if (!(await exists(path.join(dist, 'assets')))) fail('dist/assets/ is missing');

const pages = getAllPages();
const titles = new Map(); // title -> [routes]
let checked = 0;

for (const { path: route } of pages) {
  const file = route === '/' ? 'index.html' : path.join(route.replace(/^\//, ''), 'index.html');
  let html;
  try {
    html = await readFile(path.join(dist, file), 'utf-8');
  } catch {
    fail(`prerendered page missing: ${file}`);
    continue;
  }
  checked++;

  const t = [...html.matchAll(/<title[^>]*>([^<]*)<\/title>/g)].map((m) => m[1].trim());
  if (t.length !== 1) fail(`${route}: expected exactly 1 <title>, found ${t.length}`);
  else titles.set(t[0], [...(titles.get(t[0]) || []), route]);

  const canon = html.match(/<link rel="canonical" href="[^"]*"/g) || [];
  if (canon.length !== 1) fail(`${route}: expected exactly 1 canonical, found ${canon.length}`);

  // Arabic and Urdu pages must be right-to-left with the right lang. A boot-order
  // change once left every /ar/ and /ur/ page as <html lang="en"> with no dir.
  const lang = route.split('/')[1];
  if (lang === 'ar' || lang === 'ur') {
    const root = html.match(/<html[^>]*>/)?.[0] || '';
    if (!new RegExp(`lang="${lang}"`).test(root) || !/dir="rtl"/.test(root)) fail(`${route}: expected <html lang="${lang}" dir="rtl">, got ${root}`);
  } else if (lang === 'en') {
    const root = html.match(/<html[^>]*>/)?.[0] || '';
    if (!/lang="en"/.test(root) || /dir="rtl"/.test(root)) fail(`${route}: expected an LTR English <html>, got ${root}`);
  }

  // Google's standard tag must be in the page source exactly once, and nothing
  // else may load gtag.js. A missing tag means Google Ads can't detect the site;
  // a second one (e.g. a runtime-injected ...&cx=c&gtm=... copy baked in by the
  // prerender snapshot) makes the real page load gtag.js twice.
  const gtagSrcs = [...html.matchAll(/<script[^>]+src="(https:\/\/www\.googletagmanager\.com\/gtag\/js[^"]*)"/g)].map((m) => m[1].replace(/&amp;/g, '&'));
  if (gtagSrcs.length !== 1 || gtagSrcs[0] !== 'https://www.googletagmanager.com/gtag/js?id=G-N8F28JJFW1') {
    fail(`${route}: expected exactly one standard gtag.js tag, found ${gtagSrcs.length}: ${gtagSrcs.join(' | ') || 'none'}`);
  }
}

// Every page should have its own title. The bare "/" and "/en/" are both the
// English homepage on purpose, so they are allowed to share one.
for (const [title, routes] of titles) {
  const real = routes.filter((r) => r !== '/');
  if (real.length > 1) fail(`duplicate <title> "${title}" on ${real.length} pages (e.g. ${real.slice(0, 3).join(', ')})`);
}

const notFound = await readFile(path.join(dist, '404.html'), 'utf-8').catch(() => '');
if (!/noindex/.test(notFound)) fail('404.html is missing its noindex tag');

// Sitemap should list every non-root page, once per language.
const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf-8').catch(() => '');
const expected = (STATIC_PAGES.length + SERVICE_PAGES.length + LOCATION_PAGES.length + BLOG_POST_SLUGS.length) * LANGS.length;
const urls = (sitemap.match(/<loc>/g) || []).length;
if (urls !== expected) fail(`sitemap has ${urls} URLs, expected ${expected}`);

if (problems.length) {
  console.error(`\nBuild verification FAILED (${problems.length} problem${problems.length === 1 ? '' : 's'}):`);
  for (const p of problems.slice(0, 40)) console.error(`  - ${p}`);
  if (problems.length > 40) console.error(`  ...and ${problems.length - 40} more`);
  process.exit(1);
}
console.log(`Build verification passed: ${checked} prerendered pages, ${titles.size} distinct titles, ${urls} sitemap URLs.`);
