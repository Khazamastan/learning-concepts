import { useState } from "react";

const defaultRoutes = [
  { path: "/", method: "GET", action: "Render HTML index" },
  { path: "/api/time", method: "GET", action: "Return JSON time payload" },
  { path: "/static/*", method: "GET", action: "Serve static asset" },
];

export default function WebServerDemo() {
  const [routes, setRoutes] = useState(defaultRoutes);
  const [method, setMethod] = useState("GET");
  const [path, setPath] = useState("/");
  const [result, setResult] = useState("");

  function dispatch() {
    const match =
      routes.find(
        (route) =>
          route.method === method &&
          (route.path === path ||
            (route.path.endsWith("*") &&
              path.startsWith(route.path.replace("*", ""))))
      ) ?? null;
    if (match) {
      setResult(`Matched route: ${match.method} ${match.path} → ${match.action}`);
    } else {
      setResult("404 Not Found");
    }
  }

  function addRoute() {
    const newPath = prompt("Route path (e.g. /users/:id)");
    if (!newPath) return;
    const newMethod = prompt("HTTP method", "GET")?.toUpperCase() ?? "GET";
    const action = prompt("Handler description", "Custom handler");
    setRoutes((current) => [
      ...current,
      { path: newPath, method: newMethod, action: action ?? "Custom handler" },
    ]);
  }

  return (
    <div className="panel">
      <h2>Web Server Router</h2>
      <section>
        <h3>Routing Table</h3>
        <ul>
          {routes.map((route) => (
            <li key={`${route.method}-${route.path}`}>
              <strong>{route.method}</strong> {route.path} — {route.action}
            </li>
          ))}
        </ul>
        <button onClick={addRoute}>Add Route</button>
      </section>
      <section>
        <h3>Dispatch Request</h3>
        <div className="form-grid">
          <label>
            Method
            <input
              value={method}
              onChange={(event) => setMethod(event.target.value.toUpperCase())}
            />
          </label>
          <label>
            Path
            <input value={path} onChange={(event) => setPath(event.target.value)} />
          </label>
        </div>
        <button onClick={dispatch}>Resolve</button>
        <p>{result}</p>
      </section>
    </div>
  );
}
