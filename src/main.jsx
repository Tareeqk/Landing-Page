import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n.js";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/manrope";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
);
