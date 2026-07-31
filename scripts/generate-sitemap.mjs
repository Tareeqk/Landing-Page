// scripts/generate-sitemap.mjs
// Regenerates public/sitemap.xml from scripts/site-routes.mjs.
// Run manually with `node scripts/generate-sitemap.mjs` after adding a route.

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { LANGS, STATIC_PAGES, SERVICE_PAGES, LOCATION_PAGES, BLOG_POST_SLUGS, urlFor } from './site-routes.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Each STATIC_PAGES/SERVICE_PAGES/LOCATION_PAGES/BLOG_POST_SLUGS entry gets
// one <url> block per language (block() itself lists all 3 as alternates,
// so we still need 3 <loc> entries — one per language variant).
function blocksFor(slug, priority) {
  return LANGS.map((lang) => {
    const lines = ['  <url>', `    <loc>${urlFor(lang, slug)}</loc>`];
    for (const hl of LANGS) {
      lines.push(`    <xhtml:link rel="alternate" hreflang="${hl}"        href="${urlFor(hl, slug)}"/>`);
    }
    lines.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor('en', slug)}"/>`);
    lines.push(`    <priority>${priority}</priority>`, '  </url>');
    return lines.join('\n');
  }).join('\n');
}

const out = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  '',
];

for (const { slug, priority } of STATIC_PAGES) {
  out.push(blocksFor(slug, priority), '');
}

out.push('  <!-- Service pages -->');
for (const slug of SERVICE_PAGES) out.push(blocksFor(slug, '0.8'), '');

out.push('  <!-- Location pages -->');
for (const slug of LOCATION_PAGES) out.push(blocksFor(slug, '0.8'), '');

out.push('  <!-- Blog posts -->');
for (const slug of BLOG_POST_SLUGS) out.push(blocksFor(`page/${slug}`, '0.6'), '');

out.push('</urlset>');

const dest = path.join(__dirname, '..', 'public', 'sitemap.xml');
await writeFile(dest, out.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n');
console.log(`Wrote ${dest}`);
