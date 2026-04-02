import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { ChessPathFinder } from "./ChessPathFinder.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ChessPathFinder />
  </React.StrictMode>,
);
