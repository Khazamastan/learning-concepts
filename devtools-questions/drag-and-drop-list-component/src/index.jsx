import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { DragAndDropList } from "./DragList.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DragAndDropList />
  </React.StrictMode>,
);
