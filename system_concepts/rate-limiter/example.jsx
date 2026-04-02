import { useEffect, useState } from "react";

export default function RateLimiterDemo() {
  const capacity = 5;
  const intervalMs = 10_000;
  const [tokens, setTokens] = useState(capacity);
  const [lastRequest, setLastRequest] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTokens((current) => Math.min(capacity, current + 1));
    }, intervalMs / capacity);
    return () => clearInterval(timer);
  }, []);

  function handleRequest() {
    if (tokens >= 1) {
      setTokens((current) => current - 1);
      appendHistory("Allowed");
    } else {
      appendHistory("Throttled");
    }
  }

  function appendHistory(status) {
    const entry = {
      id: crypto.randomUUID(),
      time: new Date(),
      status,
      retryAfter: status === "Throttled" ? Math.ceil(intervalMs / 1000) : 0,
    };
    setLastRequest(entry);
    setHistory((current) => [entry, ...current].slice(0, 10));
  }

  return (
    <div className="panel">
      <h2>Token Bucket Rate Limiter</h2>
      <p>
        Bucket capacity {capacity} requests / {intervalMs / 1000}s.
      </p>
      <div className="button-row">
        <button onClick={handleRequest}>Simulate Request</button>
      </div>
      <p>
        Tokens remaining: <strong>{tokens.toFixed(2)}</strong>
      </p>
      {lastRequest && (
        <p>
          Last status: {lastRequest.status}
          {lastRequest.status === "Throttled" && (
            <> — retry after {lastRequest.retryAfter}s</>
          )}
        </p>
      )}
      <section>
        <h3>Recent Events</h3>
        <ol>
          {history.map((item) => (
            <li key={item.id}>
              <time dateTime={item.time.toISOString()}>
                {item.time.toLocaleTimeString()}
              </time>{" "}
              — {item.status}
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
