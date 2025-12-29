import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App.tsx";

const PROD_BASE = "/rb/9-24-24-x7k3p";
const basename = import.meta.env.PROD ? PROD_BASE : "/";

const root = document.getElementById("root")!;
createRoot(root).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
