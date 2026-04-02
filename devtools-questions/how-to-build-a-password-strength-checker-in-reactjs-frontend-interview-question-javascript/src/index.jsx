import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { PasswordStrengthChecker } from "./password-strength-checker.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <PasswordStrengthChecker />
  </React.StrictMode>,
);
