import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { PromisifyDemo } from "./PromisifyDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PromisifyDemo />
  </React.StrictMode>,
);
