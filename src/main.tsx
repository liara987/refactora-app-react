import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ResultView from "./ResultView.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResultView />
  </StrictMode>,
);
