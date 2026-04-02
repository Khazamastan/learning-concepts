import * as React from "react";
import { measure } from "./measure.js";

const TASKS = [
  {
    id: "fib-recursive",
    name: "Fibonacci (recursive)",
    description: "Exponential recursion. Brute force without memoization.",
    run: (n) => fibRecursive(n),
  },
  {
    id: "fib-dp",
    name: "Fibonacci (dynamic programming)",
    description: "Iterative approach with O(n) time.",
    run: (n) => fibDP(n),
  },
  {
    id: "sort",
    name: "Array sort",
    description: "Sorts an array of random numbers.",
    run: (n) => {
      const arr = Array.from({ length: n }, () => Math.random());
      return arr.sort((a, b) => a - b);
    },
  },
  {
    id: "async",
    name: "Async wait",
    description: "Resolves after a random delay (simulating API).",
    async: true,
    run: async (n) => {
      const delay = Math.min(2000, Math.max(100, n * 5));
      await new Promise((resolve) => setTimeout(resolve, delay));
      return { delay };
    },
  },
];

export function MeasureDemo() {
  const [inputSize, setInputSize] = React.useState(25);
  const [selectedTaskId, setSelectedTaskId] = React.useState("fib-recursive");
  const [logs, setLogs] = React.useState([]);
  const [isRunning, setIsRunning] = React.useState(false);

  const selectedTask = TASKS.find((task) => task.id === selectedTaskId);

  const runMeasurement = async () => {
    if (!selectedTask) return;
    setIsRunning(true);
    try {
      const result = await measure(selectedTask.run, [Number(inputSize)], {
        label: selectedTask.name,
        async: selectedTask.async,
      });
      setLogs((entries) => [
        {
          id: crypto.randomUUID(),
          ...result,
          timestamp: new Date(),
          inputSize: inputSize,
        },
        ...entries,
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="measure-demo">
      <header>
        <h1>Measure Function Execution Time</h1>
        <p>
          Wrap any synchronous or asynchronous function to capture precise runtime with <code>performance.now()</code>.
          Try different algorithms and input sizes to compare their growth.
        </p>
      </header>

      <section className="card controls">
        <div className="field">
          <label htmlFor="task">Task</label>
          <select id="task" value={selectedTaskId} onChange={(event) => setSelectedTaskId(event.target.value)}>
            {TASKS.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
          <p className="description">{selectedTask?.description}</p>
        </div>
        <div className="field">
          <label htmlFor="size">Input size: {inputSize}</label>
          <input
            id="size"
            type="range"
            min="5"
            max="40"
            value={inputSize}
            onChange={(event) => setInputSize(event.target.value)}
          />
        </div>
        <button type="button" onClick={runMeasurement} disabled={isRunning}>
          {isRunning ? "Running..." : "Measure"}
        </button>
      </section>

      <section className="card log">
        <h2>Recent runs</h2>
        <table>
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Task</th>
              <th>Input</th>
              <th>Duration (ms)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.timestamp.toLocaleTimeString()}</td>
                <td>{entry.label}</td>
                <td>{entry.inputSize}</td>
                <td>{entry.duration.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!logs.length && <p>No measurements yet. Choose a task and click “Measure”.</p>}
      </section>
    </div>
  );
}

function fibRecursive(n) {
  if (n <= 1) return n;
  return fibRecursive(n - 1) + fibRecursive(n - 2);
}

function fibDP(n) {
  if (n <= 1) return n;
  let prev = 0;
  let curr = 1;
  for (let i = 2; i <= n; i += 1) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}
