import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { TimerDemo } from "./TimerDemo.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <main className="app-shell">
      <section className="panel">
        <header>
          <h1>useTimer hook</h1>
          <p>Switch between stopwatch and countdown modes with pause/resume.</p>
        </header>
        <TimerDemo />
      </section>
    </main>
  </React.StrictMode>,
);
