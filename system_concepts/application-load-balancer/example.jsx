import { useMemo, useState } from "react";

const defaultBackends = [
  { id: "backend-a", url: "http://service-a" },
  { id: "backend-b", url: "http://service-b" },
];

export default function LoadBalancerDemo() {
  const [backends, setBackends] = useState(defaultBackends);
  const [requests, setRequests] = useState([]);
  const pointer = useMemo(() => ({ value: 0 }), []);

  function addBackend() {
    const url = prompt("Enter backend URL", "http://service-x");
    if (!url) return;
    setBackends((current) => [
      ...current,
      { id: crypto.randomUUID(), url },
    ]);
  }

  function removeBackend(id) {
    setBackends((current) =>
      current.length > 1 ? current.filter((backend) => backend.id !== id) : current
    );
  }

  function handleRequest() {
    if (backends.length === 0) return;
    const target = backends[pointer.value % backends.length];
    pointer.value += 1;
    const newRequest = {
      id: crypto.randomUUID(),
      timestamp: new Date(),
      backend: target.url,
    };
    setRequests((current) => [newRequest, ...current].slice(0, 12));
  }

  return (
    <div className="panel">
      <h2>Application Load Balancer (Round Robin)</h2>
      <p>
        Click <em>Dispatch Request</em> to see how a round-robin listener
        forwards traffic to healthy target groups.
      </p>
      <section>
        <h3>Registered Backends</h3>
        <ul>
          {backends.map((backend) => (
            <li key={backend.id}>
              {backend.url}{" "}
              <button onClick={() => removeBackend(backend.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={addBackend}>Add Backend</button>
      </section>
      <div className="button-row">
        <button onClick={handleRequest} disabled={backends.length === 0}>
          Dispatch Request
        </button>
      </div>
      <section>
        <h3>Recent Requests</h3>
        <ol>
          {requests.map((req) => (
            <li key={req.id}>
              <time dateTime={req.timestamp.toISOString()}>
                {req.timestamp.toLocaleTimeString()}
              </time>{" "}
              routed to <strong>{req.backend}</strong>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
