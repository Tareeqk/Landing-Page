import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { i18nReady } from "./i18n.js";
import { preloadRoute } from "./routePrefetch";
import { initAdsTracking } from "./utils/adsTracking";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// createRoot, NOT hydrateRoot. scripts/prerender.mjs snapshots the browser's
// live DOM (page.content()) rather than running React's server renderer, so
// the static HTML has none of the <!--$--> markers React needs to hydrate a
// <Suspense> boundary. hydrateRoot therefore always failed at App's root
// <Suspense> ("Hydration failed ... React error #418"), threw the prerendered
// DOM away, and rendered the <PageLoader> spinner until the lazy route
// chunks arrived -- on a throttled mobile connection the page vanished at
// ~5.4s and only came back ~1.9s later.
//
// Instead, keep the prerendered page on screen, load everything the first
// render needs (translations + this route's lazy chunks) up front, then
// mount once. The first commit already contains the real page, so the
// prerendered HTML is swapped for identical live markup with no spinner.
initAdsTracking();

const root = document.getElementById("root");
const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

// Never let a slow or failed preload keep the site from starting: after
// this long, mount anyway and let Suspense show its fallback.
const PRELOAD_TIMEOUT_MS = 4000;

async function boot() {
  try {
    await Promise.race([
      Promise.all([i18nReady, preloadRoute(window.location.pathname)]),
      new Promise((resolve) => setTimeout(resolve, PRELOAD_TIMEOUT_MS)),
    ]);
  } catch (err) {
    console.warn("Preload before first render failed; mounting anyway.", err);
  }
  ReactDOM.createRoot(root).render(app);
}

boot();
