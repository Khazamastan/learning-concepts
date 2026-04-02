import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { TabbedCard } from "./TabbedCard.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <main className="app-shell">
      <h1 className="app-title">UI Card with Tabs</h1>
      <TabbedCard />
    </main>
  </React.StrictMode>,
);
