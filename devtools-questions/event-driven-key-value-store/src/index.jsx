import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { StoreDemo } from "./StoreDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <StoreDemo />
  </React.StrictMode>,
);
