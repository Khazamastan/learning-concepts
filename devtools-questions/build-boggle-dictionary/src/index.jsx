import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { BoggleDictionary } from "./BoggleDictionary.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BoggleDictionary />
  </React.StrictMode>,
);
