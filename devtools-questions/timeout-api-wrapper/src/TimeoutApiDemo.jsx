import * as React from "react";
import { requestWithTimeout } from "./apiWrapper.js";

const SCENARIOS = [
  {
    id: "fast",
    label: "Fast success (500ms)",
    request: () => simulateRequest({ delay: 500, payload: { message: "Fetched products" } }),
  },
  {
    id: "slow",
    label: "Slow success (2500ms)",
    request: () => simulateRequest({ delay: 2500, payload: { message: "Fetched analytics" } }),
  },
  {
    id: "flaky",
    label: "Flaky endpoint (random fail)",
    request: () =>
      simulateRequest({
        delay: randomBetween(400, 1600),
        payload: { message: "Sometimes fails" },
        failureRate: 0.5,
      }),
  },
  {
    id: "timeout",
    label: "Very slow (4s)",
    request: () => simulateRequest({ delay: 4000, payload: { message: "Slow report" } }),
  },
];

export function TimeoutApiDemo() {
  const [scenarioId, setScenarioId] = React.useState("fast");
  const [timeoutMs, setTimeoutMs] = React.useState(1500);
  const [retries, setRetries] = React.useState(1);
  const [retryDelay, setRetryDelay] = React.useState(500);
  const [logs, setLogs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const scenario = SCENARIOS.find((item) => item.id === scenarioId);

  const runRequest = async () => {
    setIsLoading(true);
    const logEntry = {
      id: crypto.randomUUID(),
      startedAt: new Date(),
      status: "pending",
      attempts: [],
    };
    setLogs((entries) => [logEntry, ...entries]);

    const requestFn = async () => {
      logEntry.attempts.push(new Date());
      return await scenario.request();
    };

    try {
      const data = await requestWithTimeout(requestFn, {
        timeout: Number(timeoutMs),
        retries: Number(retries),
        retryDelay: Number(retryDelay),
      });
      logEntry.status = "success";
      logEntry.finishedAt = new Date();
      logEntry.result = data;
      setLogs((entries) => [logEntry, ...entries.slice(1)]);
    } catch (error) {
      logEntry.status = "error";
      logEntry.finishedAt = new Date();
      logEntry.result = { message: error.message };
      setLogs((entries) => [logEntry, ...entries.slice(1)]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="timeout-demo">
      <header>
        <h1>Timeout-Based API Wrapper with Retry</h1>
        <p>
          Wrap any promise-returning request with configurable timeouts, retries, and retry delays. Useful for fetch,
          Axios, or custom RPC clients.
        </p>
      </header>

      <section className="card controls">
        <div className="field">
          <label htmlFor="scenario">Scenario</label>
          <select id="scenario" value={scenarioId} onChange={(event) => setScenarioId(event.target.value)}>
            {SCENARIOS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="timeout">Timeout (ms)</label>
          <input
            id="timeout"
            type="number"
            min="100"
            step="100"
            value={timeoutMs}
            onChange={(event) => setTimeoutMs(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="retries">Retries</label>
          <input
            id="retries"
            type="number"
            min="0"
            max="5"
            value={retries}
            onChange={(event) => setRetries(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="retryDelay">Retry delay (ms)</label>
          <input
            id="retryDelay"
            type="number"
            min="0"
            step="100"
            value={retryDelay}
            onChange={(event) => setRetryDelay(event.target.value)}
          />
        </div>
        <button type="button" onClick={runRequest} disabled={isLoading}>
          {isLoading ? "Running..." : "Send request"}
        </button>
      </section>

      <section className="card log">
        <h2>Timeline</h2>
        <ul>
          {logs.map((entry) => (
            <li key={entry.id} data-status={entry.status}>
              <div className="log-header">
                <span>{entry.status === "success" ? "✅ Success" : entry.status === "error" ? "⚠️ Error" : "… Pending"}</span>
                <time>{entry.startedAt.toLocaleTimeString()}</time>
              </div>
              <div>
                Attempts: {entry.attempts.length}{" "}
                {entry.attempts.map((attempt, index) => (
                  <time key={index}>{attempt.toLocaleTimeString()}</time>
                ))}
              </div>
              {entry.result && <pre>{JSON.stringify(entry.result, null, 2)}</pre>}
            </li>
          ))}
        </ul>
        {!logs.length && <p>No requests yet. Configure a scenario and click “Send request”.</p>}
      </section>
    </div>
  );
}

function simulateRequest({ delay = 1000, payload, failureRate = 0 }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failureRate) {
        reject(new Error("Server responded with 500"));
      } else {
        resolve(payload);
      }
    }, delay);
  });
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
