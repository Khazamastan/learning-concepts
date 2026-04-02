import { useState } from "react";

const DEFAULT_SERVER = "https://dns.google/resolve";

export default function DnsResolverDemo() {
  const [hostname, setHostname] = useState("openai.com");
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("Ready");

  async function resolve() {
    if (!hostname) return;
    setStatus("Resolving...");
    setRecords([]);
    try {
      const response = await fetch(
        `${DEFAULT_SERVER}?name=${encodeURIComponent(hostname)}&type=A`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (!data.Answer) {
        setStatus("No A records found.");
        return;
      }
      setRecords(
        data.Answer.filter((item) => item.type === 1).map((answer) => ({
          name: answer.name,
          ttl: answer.TTL,
          data: answer.data,
        }))
      );
      setStatus(`Received ${data.Answer.length} answers`);
    } catch (error) {
      setStatus(`Lookup failed: ${error.message}`);
    }
  }

  return (
    <div className="panel">
      <h2>DNS Resolver (DoH)</h2>
      <p>Uses DNS-over-HTTPS (Google resolver) to fetch A records.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          resolve();
        }}
        className="form-grid"
      >
        <label htmlFor="hostname">Hostname</label>
        <input
          id="hostname"
          value={hostname}
          onChange={(event) => setHostname(event.target.value)}
          placeholder="example.com"
          required
        />
        <button type="submit">Resolve</button>
      </form>
      <p>{status}</p>
      <ul>
        {records.map((record, index) => (
          <li key={`${record.data}-${index}`}>
            <strong>{record.data}</strong> — TTL {record.ttl}s
          </li>
        ))}
      </ul>
    </div>
  );
}
