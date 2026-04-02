import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { DomainOperationSimulator } from "./DomainOperationSimulator.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DomainOperationSimulator />
  </React.StrictMode>,
);
