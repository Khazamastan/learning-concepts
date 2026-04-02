import * as React from "react";
import { compareSemver, parseSemver } from "./compareSemver.js";

const PRESETS = [
  ["1.0.0", "1.0.1"],
  ["2.1.0-alpha.1", "2.1.0-alpha.3"],
  ["3.4.5", "3.4.5-beta.0"],
  ["1.2.3+build.10", "1.2.3+build.9"],
];

export function SemverPlayground() {
  const [left, setLeft] = React.useState("1.0.0");
  const [right, setRight] = React.useState("1.0.1");
  const [result, setResult] = React.useState(() => getComparison("1.0.0", "1.0.1"));
  const [error, setError] = React.useState(null);

  const handleCompare = (versionA = left, versionB = right) => {
    try {
      const detail = getComparison(versionA, versionB);
      setResult(detail);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  React.useEffect(() => {
    handleCompare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const badge = result ? (result.comparison === 0 ? "equal" : result.comparison > 0 ? ">" : "<") : " ";

  return (
    <div className="semver-playground">
      <header>
        <h1>Compare Semantic Versions</h1>
        <p>
          Implements SemVer 2.0.0 comparison rules: major → minor → patch → prerelease
          identifiers. Build metadata is parsed but ignored for ordering.
        </p>
      </header>

      <section className="card inputs">
        <div className="version-field">
          <label htmlFor="version-left">Version A</label>
          <input
            id="version-left"
            value={left}
            onChange={(event) => {
              setLeft(event.target.value);
              handleCompare(event.target.value, right);
            }}
          />
        </div>
        <div className="comparison-badge" data-state={badge}>
          {badge}
        </div>
        <div className="version-field">
          <label htmlFor="version-right">Version B</label>
          <input
            id="version-right"
            value={right}
            onChange={(event) => {
              setRight(event.target.value);
              handleCompare(left, event.target.value);
            }}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="preset-row">
          {PRESETS.map(([a, b]) => (
            <button
              key={`${a}-${b}`}
              type="button"
              onClick={() => {
                setLeft(a);
                setRight(b);
                handleCompare(a, b);
              }}
            >
              {a} vs {b}
            </button>
          ))}
        </div>
      </section>

      {result && (
        <section className="card detail">
          <h2>Comparison result</h2>
          <p className="result">
            <code>{result.left.input}</code>
            <span>{badge === "equal" ? "=" : badge}</span>
            <code>{result.right.input}</code>
          </p>
          <div className="grid">
            <DetailCard title="Version A breakdown" data={result.left} />
            <DetailCard title="Version B breakdown" data={result.right} />
          </div>
          <p className="note">
            Build metadata (after <code>+</code>) does not influence ordering. Use prerelease
            tags for release candidates (e.g., <code>-alpha.1</code>).
          </p>
        </section>
      )}
    </div>
  );
}

function DetailCard({ title, data }) {
  return (
    <article className="detail-card">
      <h3>{title}</h3>
      <dl>
        <div>
          <dt>Major</dt>
          <dd>{data.major}</dd>
        </div>
        <div>
          <dt>Minor</dt>
          <dd>{data.minor}</dd>
        </div>
        <div>
          <dt>Patch</dt>
          <dd>{data.patch}</dd>
        </div>
        <div>
          <dt>Prerelease</dt>
          <dd>{data.prerelease.length ? data.prerelease.join(".") : "—"}</dd>
        </div>
        <div>
          <dt>Build metadata</dt>
          <dd>{data.build || "—"}</dd>
        </div>
      </dl>
    </article>
  );
}

function getComparison(a, b) {
  const left = parseSemver(a);
  const right = parseSemver(b);
  const comparison = compareSemver(left, right);
  return { left, right, comparison };
}
