import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { LineBoardGame } from "./LineBoardGame.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LineBoardGame />
  </React.StrictMode>,
);
