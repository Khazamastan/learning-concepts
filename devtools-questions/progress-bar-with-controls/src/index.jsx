import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { ProgressBarWithControls } from "./ProgressBarWithControls.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProgressBarWithControls />
  </React.StrictMode>,
);
