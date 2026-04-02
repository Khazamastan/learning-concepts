import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { InteractiveColorPicker } from "./InteractiveColorPicker.jsx";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <InteractiveColorPicker />
  </React.StrictMode>,
);
