import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./i18n.js";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/manrope";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/700.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);