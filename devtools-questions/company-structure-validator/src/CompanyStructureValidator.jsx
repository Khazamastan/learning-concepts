import * as React from "react";
import { validateStructure } from "./validateStructure.js";

const SAMPLE = `[
  { "id": "ceo", "name": "A.K. Sharma", "title": "CEO" },
  { "id": "cto", "name": "Neha Verma", "managerId": "ceo", "title": "CTO" },
  { "id": "eng1", "name": "Arjun Mehta", "managerId": "cto", "title": "Engineering Manager" },
  { "id": "eng2", "name": "Ishita Patel", "managerId": "eng1", "title": "Senior Engineer" },
  { "id": "eng3", "name": "Rahul Jain", "managerId": "eng1", "title": "Senior Engineer" },
  { "id": "hr", "name": "Meera Kapur", "managerId": "ceo", "title": "Head of People" }
]`;

export function CompanyStructureValidator() {
  const [input, setInput] = React.useState(SAMPLE);
  const [issues, setIssues] = React.useState(() => validateStructure(JSON.parse(SAMPLE)));
  const [error, setError] = React.useState(null);

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(input);
      const results = validateStructure(parsed);
      setIssues(results);
      setError(null);
    } catch (err) {
      setError(err.message);
      setIssues([]);
    }
  };

  const issueCount = issues.length;
  const grouped = groupByLevel(issues);

  return (
    <div className="structure-validator">
      <header>
        <h1>Company Structure Validator</h1>
        <p>
          Paste a list of employees (array of objects) to verify hierarchy rules: unique IDs,
          valid manager links, cycle detection, report limits, and title saturation.
        </p>
      </header>

      <section className="card input-card">
        <label htmlFor="structure-input">Employee JSON</label>
        <textarea
          id="structure-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={14}
        />
        <div className="actions">
          <button type="button" onClick={handleValidate}>
            Validate structure
          </button>
          <button type="button" onClick={() => setInput(SAMPLE)}>
            Reset sample
          </button>
        </div>
        {error && <p className="error">Parse error: {error}</p>}
      </section>

      <section className="card report">
        <h2>Report</h2>
        <p>
          {issueCount
            ? `${issueCount} issue${issueCount === 1 ? "" : "s"} found.`
            : "No issues detected. This structure passes all checks."}
        </p>
        {Object.entries(grouped).map(([level, items]) => (
          <div className="issue-group" key={level}>
            <h3>{levelLabel(level)}</h3>
            <ul>
              {items.map((item) => (
                <li key={item.message}>{item.message}</li>
              ))}
            </ul>
          </div>
        ))}
        {!issueCount && <Callout />}
      </section>
    </div>
  );
}

function levelLabel(level) {
  switch (level) {
    case "error":
      return "Errors";
    case "warning":
      return "Warnings";
    case "info":
      return "Info";
    default:
      return "Notes";
  }
}

function groupByLevel(issues) {
  return issues.reduce((acc, issue) => {
    const level = issue.level ?? "info";
    acc[level] = acc[level] ?? [];
    acc[level].push(issue);
    return acc;
  }, {});
}

function Callout() {
  return (
    <aside className="callout">
      <h4>Structure checklist</h4>
      <ul>
        <li>Each employee owns a unique <code>id</code>.</li>
        <li>Manager references exist and do not form cycles.</li>
        <li>Consider splitting teams with more than 8 direct reports.</li>
        <li>Ensure titles provide progression clarity.</li>
      </ul>
    </aside>
  );
}
