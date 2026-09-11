// scripts/fetch-ratings.mjs
//
// Runs before `vite build` (see package.json's `prebuild`). Pulls the
// current Google rating from the backend's public GET /api/v1/ratings
// (see tareeqk-v2-be: RatingController, backed by the ratings.google
// setting, refreshed daily by the ratings:sync-google scheduled command)
// and writes it to src/data/ratings.json.
//
// This has to happen at BUILD time, not client-side at runtime: the site
// is fully prerendered (scripts/prerender.mjs snapshots each route to a
// static file), so anything that should be visible in the raw HTML
// crawlers see -- the AggregateRating schema in LocalBusinessSchema.jsx,
// the visible rating stat on the homepage -- has to already be baked
// into the React tree by the time that snapshot is taken. A fetch inside
// a useEffect would only ever update the page after hydration, invisible
// to the exact audience (non-JS crawlers, first-paint HTML) prerendering
// exists to serve.
//
// Always hits the production backend regardless of local build env --
// same reasoning as site-routes.mjs hardcoding the production domain for
// the sitemap: a rating is a real production business fact, not
// something that should vary between a developer's local build and the
// live site.

import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dest = path.join(__dirname, '..', 'src', 'data', 'ratings.json');

const RATINGS_ENDPOINT = 'https://platform.tareeqk.ae/api/v1/ratings';

async function readExisting() {
  try {
    return JSON.parse(await readFile(dest, 'utf-8'));
  } catch {
    return { google: null };
  }
}

async function main() {
  const fallback = await readExisting();

  let response;
  try {
    response = await fetch(RATINGS_ENDPOINT, { signal: AbortSignal.timeout(10_000) });
  } catch (err) {
    console.warn(`fetch-ratings: request failed (${err.message}) -- keeping last known ratings.json`);
    return;
  }

  if (!response.ok) {
    console.warn(`fetch-ratings: backend returned HTTP ${response.status} -- keeping last known ratings.json`);
    return;
  }

  const body = await response.json();
  const google = body?.data?.google ?? null;

  // A day where the backend is reachable but hasn't synced yet (fresh
  // environment, sync job hasn't run) returns google: null -- don't let
  // that overwrite a real value from a previous successful build.
  const next = { google: google ?? fallback.google };

  await writeFile(dest, JSON.stringify(next, null, 2) + '\n');
  console.log(
    next.google
      ? `Wrote ${dest} (${next.google.rating}★, ${next.google.review_count} reviews)`
      : `Wrote ${dest} (no rating synced yet)`
  );
}

await main();
