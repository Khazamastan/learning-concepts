import * as React from "react";
import { composeAsync, pipeAsync } from "./composeAsync.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncSteps = [
  async (value) => {
    await wait(400);
    return value.trim();
  },
  async (value) => {
    await wait(300);
    return value.toUpperCase();
  },
  async (value) => {
    await wait(500);
    return `${value} 🚀`;
  },
];

const composed = composeAsync(...asyncSteps);
const piped = pipeAsync(...asyncSteps);

export function ComposeAsyncDemo() {
  const [input, setInput] = React.useState("compose me");
  const [mode, setMode] = React.useState("compose");
  const [result, setResult] = React.useState("");
  const [isRunning, setIsRunning] = React.useState(false);
  const [log, setLog] = React.useState([]);

  const runPipeline = async () => {
    setIsRunning(true);
    setLog([]);

    const selectedFn = mode === "compose" ? composed : piped;
    const steps = mode === "compose" ? [...asyncSteps].reverse() : asyncSteps;

    let value = input;
    for (const [index, fn] of steps.entries()) {
      const fnName = fn.name || `step${index + 1}`;
      setLog((entries) => [
        { id: crypto.randomUUID(), type: "start", message: `Running ${fnName}` },
        ...entries,
      ]);
      // eslint-disable-next-line no-await-in-loop
      value = await fn(value);
      setLog((entries) => [
        {
          id: crypto.randomUUID(),
          type: "success",
          message: `${fnName} → ${value}`,
        },
        ...entries,
      ]);
    }

    setResult(value);
    setIsRunning(false);
  };

  return (
    <div className="compose-demo">
      <header>
        <h1>ComposeAsync Utility</h1>
        <p>
          Build promise-aware composition pipelines. Toggle between classical composition
          (right-to-left) and piping (left-to-right).
        </p>
      </header>

      <section className="input-panel">
        <label htmlFor="compose-input">Input value</label>
        <textarea
          id="compose-input"
          rows={3}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          disabled={isRunning}
        />

        <div className="mode">
          <span>Mode:</span>
          <label>
            <input
              type="radio"
              name="mode"
              value="compose"
              checked={mode === "compose"}
              onChange={() => setMode("compose")}
            />
            composeAsync (right-to-left)
          </label>
          <label>
            <input
              type="radio"
              name="mode"
              value="pipe"
              checked={mode === "pipe"}
              onChange={() => setMode("pipe")}
            />
            pipeAsync (left-to-right)
          </label>
        </div>

        <button type="button" onClick={runPipeline} disabled={isRunning}>
          {isRunning ? "Running..." : "Run pipeline"}
        </button>
      </section>

      <section className="result">
        <h2>Result</h2>
        <output>{result || "—"}</output>
      </section>

      <section className="log">
        <h2>Timeline</h2>
        <ul>
          {log.map((entry) => (
            <li key={entry.id} data-type={entry.type}>
              {entry.message}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
