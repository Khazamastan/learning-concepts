import * as React from "react";
import { promisify } from "./promisify.js";

function fakeApi(data, callback) {
  setTimeout(() => {
    if (data.shouldFail) callback(new Error("Request failed"));
    else callback(null, { ok: true, payload: data.payload });
  }, 600);
}

const fakeApiAsync = promisify(fakeApi);

export function PromisifyDemo() {
  const [payload, setPayload] = React.useState("Hello");
  const [shouldFail, setShouldFail] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const run = async () => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fakeApiAsync({ payload, shouldFail });
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="promisify-app">
      <header>
        <h1>Promisify Polyfill</h1>
        <p>Wrap Node-style callbacks (<code>(err, result)</code>) so they return promises.</p>
      </header>

      <section className="card">
        <label>
          Payload
          <input value={payload} onChange={(event) => setPayload(event.target.value)} />
        </label>
        <label className="checkbox">
          <input type="checkbox" checked={shouldFail} onChange={(event) => setShouldFail(event.target.checked)} />
          Force failure
        </label>
        <button type="button" onClick={run} disabled={isLoading}>
          {isLoading ? "Calling..." : "Call fake API"}
        </button>
      </section>

      <section className="card result-card">
        <h2>Result</h2>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        {error && <p className="error">{error}</p>}
        {!result && !error && <p>No call yet.</p>}
      </section>
    </div>
  );
}
