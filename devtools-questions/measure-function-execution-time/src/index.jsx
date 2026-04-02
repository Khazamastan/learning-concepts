import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { MeasureDemo } from "./MeasureDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MeasureDemo />
  </React.StrictMode>,
);
