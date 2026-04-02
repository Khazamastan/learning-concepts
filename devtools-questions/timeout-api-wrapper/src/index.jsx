import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { TimeoutApiDemo } from "./TimeoutApiDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <TimeoutApiDemo />
  </React.StrictMode>,
);
