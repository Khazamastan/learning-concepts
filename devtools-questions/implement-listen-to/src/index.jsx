import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { ListenToDemo } from "./ListenToDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ListenToDemo />
  </React.StrictMode>,
);
