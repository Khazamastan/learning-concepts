import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { ShoppingCartCheckout } from "./ShoppingCartCheckout.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ShoppingCartCheckout />
  </React.StrictMode>,
);
