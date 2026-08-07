import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n.js";
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// hydrateRoot, not createRoot — scripts/prerender.mjs already fills #root
// with real, crawler-visible markup at build time. createRoot ignored that
// and threw it away on every load, doing a full rebuild from scratch before
// anything was interactive. hydrateRoot reuses it instead, which is strictly
// cheaper on a throttled mobile CPU and removes that wasted render pass.
const root = document.getElementById("root");
const app = (
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);

if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app);
} else {
  // No prerendered markup (e.g. local `vite dev`, or a route the prerender
  // script didn't cover) — fall back to a normal client render instead of
  // hydrateRoot, which throws/warns loudly against an empty container.
  ReactDOM.createRoot(root).render(app);
}
