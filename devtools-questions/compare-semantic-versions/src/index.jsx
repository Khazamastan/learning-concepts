import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { SemverPlayground } from "./SemverPlayground.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <SemverPlayground />
  </React.StrictMode>,
);
