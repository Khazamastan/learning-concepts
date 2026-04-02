import * as React from "react";
import { createRoot } from "react-dom/client";

import "./styles.css";
import { AudioRecorder } from "./AudioRecorder.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <main className="app-shell">
      <section className="panel">
        <header>
          <h1>Audio Recorder</h1>
          <p>Capture a quick note, preview it, and download the clip.</p>
        </header>
        <AudioRecorder />
      </section>
    </main>
  </React.StrictMode>,
);
