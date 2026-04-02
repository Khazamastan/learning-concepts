import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { PromiseSchedulerDemo } from "./PromiseSchedulerDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PromiseSchedulerDemo />
  </React.StrictMode>,
);
