import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { AccordionDemo } from "./accordion-demo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AccordionDemo />
  </React.StrictMode>,
);
