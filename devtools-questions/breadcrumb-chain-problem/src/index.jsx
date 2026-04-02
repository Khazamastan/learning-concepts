import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { BreadcrumbDemo } from "./BreadcrumbDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BreadcrumbDemo />
  </React.StrictMode>,
);
