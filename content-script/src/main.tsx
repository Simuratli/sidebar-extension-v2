import React from "react";
import { createRoot } from "react-dom/client";
import "./style/global.scss";
import App from "./App";
import { LINKEDIN_PAGE_ENUM } from "./types/global.types";

const body = document.querySelector("body");

// Create a unique container for your extension
const app = document.createElement("div");
app.id = "my-extension-root";

if (window.location.href.includes(LINKEDIN_PAGE_ENUM.SALES)) {
  app.classList.add("uds_withReset");
}

// Ensure no conflicts with the existing page
if (body && !document.getElementById("my-extension-root")) {
  body.appendChild(app);
}

// Mount the React app
const container = document.getElementById("my-extension-root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
