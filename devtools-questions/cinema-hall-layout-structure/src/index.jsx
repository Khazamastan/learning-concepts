import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { CinemaHallLayout } from "./CinemaHallLayout.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CinemaHallLayout />
  </React.StrictMode>,
);
