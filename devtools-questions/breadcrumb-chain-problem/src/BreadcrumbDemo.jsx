import * as React from "react";
import { buildBreadcrumbChain } from "./breadcrumbs.js";

const DEFAULT_NODES = [
  { id: "home", label: "Home" },
  { id: "library", label: "Library", parentId: "home" },
  { id: "books", label: "Books", parentId: "library" },
  { id: "react", label: "React In Depth", parentId: "books" },
  { id: "author", label: "About the Author", parentId: "react" },
];

export function BreadcrumbDemo() {
  const [nodesJson, setNodesJson] = React.useState(JSON.stringify(DEFAULT_NODES, null, 2));
  const [currentId, setCurrentId] = React.useState("author");
  const [chain, setChain] = React.useState([]);
  const [error, setError] = React.useState(null);

  const parseNodes = () => {
    try {
      const parsed = JSON.parse(nodesJson);
      if (!Array.isArray(parsed)) throw new Error("JSON must be an array.");
      return parsed;
    } catch (err) {
      throw new Error(`Invalid JSON: ${err.message}`);
    }
  };

  const runBuild = () => {
    try {
      const nodes = parseNodes();
      const result = buildBreadcrumbChain(nodes, currentId);
      setChain(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      setChain([]);
    }
  };

  React.useEffect(() => {
    runBuild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="breadcrumb-demo">
      <header>
        <h1>Breadcrumb Chain Problem</h1>
        <p>
          Given unordered nodes containing <code>id</code>, <code>label</code>, and <code>parentId</code>, rebuild the
          breadcrumb trail for a target node. Handles missing parents and cycle detection.
        </p>
      </header>

      <section className="card editor-card">
        <label htmlFor="nodes">Nodes JSON</label>
        <textarea
          id="nodes"
          value={nodesJson}
          onChange={(event) => setNodesJson(event.target.value)}
          rows={12}
        />
        <label>
          Current node
          <input value={currentId} onChange={(event) => setCurrentId(event.target.value)} />
        </label>
        <button type="button" onClick={runBuild}>
          Build breadcrumb
        </button>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="card result-card">
        <h2>Result</h2>
        {chain.length ? (
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              {chain.map((node, index) => (
                <li key={node.id} aria-current={index === chain.length - 1 ? "page" : undefined}>
                  {node.label}
                </li>
              ))}
            </ol>
          </nav>
        ) : (
          <p>No breadcrumb generated yet.</p>
        )}
        <pre>{JSON.stringify(chain, null, 2)}</pre>
      </section>
    </div>
  );
}
