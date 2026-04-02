import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { StrawsGame } from "./StrawsGame.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StrawsGame />
  </React.StrictMode>,
);
