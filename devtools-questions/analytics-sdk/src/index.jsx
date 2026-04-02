import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { AnalyticsDemo } from "./AnalyticsDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AnalyticsDemo />
  </React.StrictMode>,
);
