import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { CallCounterDemo } from "./CallCounterDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CallCounterDemo />
  </React.StrictMode>,
);
