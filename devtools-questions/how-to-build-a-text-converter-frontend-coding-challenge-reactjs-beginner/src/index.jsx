import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { TextConverter } from "./text-converter.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <TextConverter />
  </React.StrictMode>,
);
