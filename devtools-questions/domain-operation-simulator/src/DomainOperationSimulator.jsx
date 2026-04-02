import * as React from "react";

const STATUSES = ["Available", "Registered", "Expired", "Grace Period", "Transfer Pending"];
const YEARS = [1, 2, 3, 5, 10];

export function DomainOperationSimulator() {
  const [domains, setDomains] = React.useState(() => []);
  const [log, setLog] = React.useState([]);
  const [form, setForm] = React.useState({ name: "", years: 1 });

  const appendLog = (message) => {
    setLog((items) => [
      { id: crypto.randomUUID(), time: new Date(), message },
      ...items,
    ]);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === "years" ? Number(value) : value }));
  };

  const registerDomain = (event) => {
    event.preventDefault();
    const trimmed = form.name.trim().toLowerCase();
    if (!trimmed) return;

    const exists = domains.find((domain) => domain.name === trimmed);

    if (exists && exists.status !== "Available") {
      appendLog(`❌ ${trimmed} is currently ${exists.status}. Registration blocked.`);
      return;
    }

    const expiration = futureDate(form.years);
    const record = {
      name: trimmed,
      status: "Registered",
      expiration,
      autoRenew: true,
    };
    setDomains((list) => {
      const filtered = list.filter((domain) => domain.name !== trimmed);
      return [...filtered, record].sort((a, b) => a.name.localeCompare(b.name));
    });
    appendLog(`✅ Registered ${trimmed} for ${form.years} year(s). Expires ${expiration.toDateString()}.`);
    setForm({ name: "", years: 1 });
  };

  const renewDomain = (domain, years) => {
    setDomains((list) =>
      list.map((item) =>
        item.name === domain.name
          ? {
              ...item,
              expiration: extendDate(item.expiration, years),
              status: "Registered",
            }
          : item,
      ),
    );
    appendLog(`🔁 Renewed ${domain.name} for ${years} year(s).`);
  };

  const expireDomain = (domain) => {
    setDomains((list) =>
      list.map((item) =>
        item.name === domain.name
          ? {
              ...item,
              status: "Expired",
            }
          : item,
      ),
    );
    appendLog(`⌛ ${domain.name} marked as expired.`);
  };

  const toggleAutoRenew = (domain) => {
    setDomains((list) =>
      list.map((item) =>
        item.name === domain.name
          ? {
              ...item,
              autoRenew: !item.autoRenew,
            }
          : item,
      ),
    );
  };

  const initiateTransfer = (domain) => {
    setDomains((list) =>
      list.map((item) =>
        item.name === domain.name
          ? {
              ...item,
              status: "Transfer Pending",
            }
          : item,
      ),
    );
    appendLog(`🚚 Transfer for ${domain.name} initiated. Awaiting approval.`);
  };

  const rows = domains.length
    ? domains
    : [
        {
          name: "example.dev",
          status: "Available",
          expiration: futureDate(1),
          autoRenew: false,
        },
      ];

  return (
    <div className="domain-simulator">
      <header>
        <h1>Domain Operation Simulator</h1>
        <p>
          Model everyday registry flows: registration, renewal, expiration, auto renew, and
          transfer requests. Use it to explain lifecycle rules to stakeholders or train
          support teams.
        </p>
      </header>

      <section className="card">
        <form className="register-form" onSubmit={registerDomain}>
          <label>
            Domain
            <input
              type="text"
              name="name"
              placeholder="e.g. designstudio.io"
              value={form.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Years
            <select name="years" value={form.years} onChange={handleChange}>
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Register</button>
        </form>
      </section>

      <section className="card">
        <h2>Portfolio</h2>
        <table>
          <thead>
            <tr>
              <th>Domain</th>
              <th>Status</th>
              <th>Expiration</th>
              <th>Auto renew</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((domain) => (
              <DomainRow
                key={domain.name}
                domain={domain}
                onRenew={renewDomain}
                onExpire={expireDomain}
                onToggleAutoRenew={toggleAutoRenew}
                onTransfer={initiateTransfer}
              />
            ))}
          </tbody>
        </table>
        <p className="legend">
          Status options: {STATUSES.join(" · ")}. Transfers move a domain into “Transfer
          Pending” until approval or cancellation.
        </p>
      </section>

      <section className="log card">
        <h2>Timeline</h2>
        <ul>
          {log.map((entry) => (
            <li key={entry.id}>
              <time dateTime={entry.time.toISOString()}>
                {entry.time.toLocaleTimeString()}
              </time>
              <span>{entry.message}</span>
            </li>
          ))}
        </ul>
        {!log.length && <p>No operations yet. Register or mutate a domain to populate the timeline.</p>}
      </section>
    </div>
  );
}

function DomainRow({ domain, onRenew, onExpire, onToggleAutoRenew, onTransfer }) {
  const expirationDate =
    domain.expiration instanceof Date ? domain.expiration : new Date(domain.expiration);

  const isRegistered = domain.status === "Registered";
  const isExpired = domain.status === "Expired";
  const isTransfer = domain.status === "Transfer Pending";

  return (
    <tr data-status={domain.status.toLowerCase()}>
      <td>
        <span className="domain-name">{domain.name}</span>
      </td>
      <td>{domain.status}</td>
      <td>{expirationDate.toDateString()}</td>
      <td>
        <label className="toggle">
          <input
            type="checkbox"
            checked={Boolean(domain.autoRenew)}
            onChange={() => onToggleAutoRenew(domain)}
          />
          <span />
        </label>
      </td>
      <td>
        <div className="actions">
          <button type="button" onClick={() => onRenew(domain, 1)} disabled={!isRegistered}>
            +1y
          </button>
          <button type="button" onClick={() => onRenew(domain, 3)} disabled={!isRegistered}>
            +3y
          </button>
          <button type="button" onClick={() => onExpire(domain)} disabled={isExpired}>
            Expire
          </button>
          <button type="button" onClick={() => onTransfer(domain)} disabled={!isRegistered || isTransfer}>
            Transfer
          </button>
        </div>
      </td>
    </tr>
  );
}

function futureDate(years) {
  const base = new Date();
  base.setFullYear(base.getFullYear() + years);
  return base;
}

function extendDate(date, years) {
  const base = date instanceof Date ? new Date(date) : new Date(date);
  base.setFullYear(base.getFullYear() + years);
  return base;
}
