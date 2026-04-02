import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { MultiStepForm } from "./MultiStepForm.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <MultiStepForm />
  </React.StrictMode>,
);
