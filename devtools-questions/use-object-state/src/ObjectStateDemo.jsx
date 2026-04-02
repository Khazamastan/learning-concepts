import * as React from "react";
import { useObjectState } from "./useObjectState.js";

export function ObjectStateDemo() {
  const [form, setForm, resetForm] = useObjectState({
    firstName: "Asha",
    lastName: "Singh",
    email: "asha@example.com",
    newsletter: true,
    city: "Bengaluru",
  });
  const [history, setHistory] = React.useState([]);

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm({ [name]: type === "checkbox" ? checked : value });
  };

  const toggleNewsletter = () => {
    setForm((current) => ({ newsletter: !current.newsletter }));
  };

  const saveSnapshot = () => {
    setHistory((entries) => [{ ...form, id: crypto.randomUUID(), time: new Date() }, ...entries]);
  };

  return (
    <div className="object-state-demo">
      <header>
        <h1>useObjectState Hook</h1>
        <p>
          A drop-in replacement for <code>useState</code> when managing object state. Partial updates merge fields
          without rewriting the entire object.
        </p>
      </header>

      <section className="card form-card">
        <h2>Profile form</h2>
        <div className="grid">
          <label>
            First name
            <input type="text" name="firstName" value={form.firstName} onChange={updateField} />
          </label>
          <label>
            Last name
            <input type="text" name="lastName" value={form.lastName} onChange={updateField} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={form.email} onChange={updateField} />
          </label>
          <label>
            City
            <input type="text" name="city" value={form.city} onChange={updateField} />
          </label>
          <label className="checkbox">
            <input type="checkbox" name="newsletter" checked={form.newsletter} onChange={updateField} />
            Subscribe to updates
          </label>
        </div>
        <div className="actions">
          <button type="button" onClick={toggleNewsletter}>
            Toggle newsletter
          </button>
          <button type="button" onClick={saveSnapshot}>
            Save snapshot
          </button>
          <button type="button" onClick={resetForm}>
            Reset
          </button>
        </div>
      </section>

      <section className="card json-card">
        <h2>Current state</h2>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </section>

      <section className="card history-card">
        <h2>Snapshots ({history.length})</h2>
        <ul>
          {history.map((entry) => (
            <li key={entry.id}>
              <time>{entry.time.toLocaleTimeString()}</time>
              <pre>{JSON.stringify(entry, null, 2)}</pre>
            </li>
          ))}
        </ul>
        {!history.length && <p>No snapshots yet. Edit the form and click “Save snapshot”.</p>}
      </section>
    </div>
  );
}
