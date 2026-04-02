import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { ComposeAsyncDemo } from "./ComposeAsyncDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ComposeAsyncDemo />
  </React.StrictMode>,
);
