import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { HomeScreen } from "./HomeScreen.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <HomeScreen />
  </React.StrictMode>,
);
