import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { ProductPage } from "./product-page.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ProductPage />
  </React.StrictMode>,
);
