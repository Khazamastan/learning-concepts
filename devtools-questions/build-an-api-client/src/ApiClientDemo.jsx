import * as React from "react";
import { ApiClient } from "./apiClient.js";

const DEFAULT_BASE = "https://jsonplaceholder.typicode.com";

export function ApiClientDemo() {
  const [baseUrl, setBaseUrl] = React.useState(DEFAULT_BASE);
  const [token, setToken] = React.useState("demo-token-123");
  const [logs, setLogs] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const clientRef = React.useRef(null);

  React.useEffect(() => {
    const client = new ApiClient({
      baseURL: baseUrl,
      headers: { Accept: "application/json" },
    });
    client.useRequest(async (config) => {
      if (token) {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      }
      return config;
    });
    client.useResponse(async (response) => {
      setLogs((entries) => [
        {
          id: crypto.randomUUID(),
          status: response.status,
          ok: response.ok,
          url: response.url,
          timestamp: new Date(),
        },
        ...entries,
      ]);
      return response;
    });
    clientRef.current = client;
  }, [baseUrl, token]);

  const runSample = async (type) => {
    if (!clientRef.current) return;
    setIsLoading(true);
    try {
      let data;
      if (type === "posts") {
        data = await clientRef.current.get("/posts?_limit=5");
      } else if (type === "post") {
        data = await clientRef.current.post("/posts", {
          title: "Hello API Client",
          body: "Generated from demo",
          userId: 101,
        });
      } else {
        data = await clientRef.current.get("/users/1");
      }
      setLogs((entries) => [
        {
          id: crypto.randomUUID(),
          status: "data",
          payload: data,
          timestamp: new Date(),
        },
        ...entries,
      ]);
    } catch (error) {
      setLogs((entries) => [
        {
          id: crypto.randomUUID(),
          status: "error",
          payload: { message: error.message },
          timestamp: new Date(),
        },
        ...entries,
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="api-client-demo">
      <header>
        <h1>Build an API Client</h1>
        <p>
          Minimal wrapper around <code>fetch</code> supporting base URLs, default headers, request/response interceptors,
          and JSON handling. Try it against JSONPlaceholder.
        </p>
      </header>

      <section className="card config-card">
        <label>
          Base URL
          <input value={baseUrl} onChange={(event) => setBaseUrl(event.target.value)} />
        </label>
        <label>
          Auth token
          <input value={token} onChange={(event) => setToken(event.target.value)} />
        </label>
        <div className="buttons">
          <button type="button" onClick={() => runSample("posts")} disabled={isLoading}>
            Fetch posts
          </button>
          <button type="button" onClick={() => runSample("user")} disabled={isLoading}>
            Fetch user
          </button>
          <button type="button" onClick={() => runSample("post")} disabled={isLoading}>
            Create post
          </button>
        </div>
      </section>

      <section className="card log-card">
        <h2>Logs</h2>
        <ul>
          {logs.map((entry) => (
            <li key={entry.id} data-status={entry.status}>
              <div className="row">
                <time>{entry.timestamp.toLocaleTimeString()}</time>
                <span>{entry.status === "data" ? "Payload" : entry.status === "error" ? "Error" : `HTTP ${entry.status}`}</span>
              </div>
              {entry.url && <div className="url">{entry.url}</div>}
              {entry.payload && <pre>{JSON.stringify(entry.payload, null, 2)}</pre>}
            </li>
          ))}
        </ul>
        {!logs.length && <p>No requests yet. Use the buttons above to fire API calls.</p>}
      </section>
    </div>
  );
}
