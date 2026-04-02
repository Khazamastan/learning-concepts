import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { CompressionDemo } from "./CompressionDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CompressionDemo />
  </React.StrictMode>,
);
