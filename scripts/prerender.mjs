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
// on top of this markup (see src/main.jsx — createRoot().render(), not
// hydrateRoot(), so it simply replaces the prerendered DOM on mount).

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
  browser = await puppeteer.launch({ headless: true });
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

    const html = await page.content();
    const outDir = route === '/' ? distDir : path.join(distDir, route);
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, 'index.html'), html);
    ok++;
  } catch (err) {
    failed.push({ route, error: err.message });
  }
}

await browser.close();
await new Promise((resolve) => server.httpServer.close(resolve));

console.log(`Prerendered ${ok}/${pages.length} routes.`);
if (failed.length) {
  console.error(`${failed.length} route(s) failed:`);
  for (const f of failed) console.error(`  ${f.route} — ${f.error}`);
  process.exitCode = 1;
}
