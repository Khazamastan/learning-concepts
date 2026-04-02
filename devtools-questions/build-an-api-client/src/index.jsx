import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { ApiClientDemo } from "./ApiClientDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ApiClientDemo />
  </React.StrictMode>,
);
