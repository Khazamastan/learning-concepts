import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { ObjectStateDemo } from "./ObjectStateDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ObjectStateDemo />
  </React.StrictMode>,
);
