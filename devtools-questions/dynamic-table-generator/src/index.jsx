import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { DynamicTableGenerator } from "./DynamicTable.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DynamicTableGenerator />
  </React.StrictMode>,
);
