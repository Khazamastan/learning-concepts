import { useMemo, useState } from "react";

function createCommit(message, author, parent, index) {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 7);
  return {
    hash,
    tree: { ...index },
    author,
    message,
    parent,
    timestamp: new Date(),
  };
}

export default function GitClientDemo() {
  const [staged, setStaged] = useState({});
  const [filename, setFilename] = useState("README.md");
  const [content, setContent] = useState("# Notes");
  const commits = useMemo(() => [], []);
  const [, forceRender] = useState({});

  function stageFile() {
    setStaged((current) => ({ ...current, [filename]: content }));
  }

  function commit() {
    if (Object.keys(staged).length === 0) return;
    const parent = commits[0] ?? null;
    const commit = createCommit(
      `Update ${Object.keys(staged).join(", ")}`,
      "MiniGit <user@example.com>",
      parent,
      staged
    );
    commits.unshift(commit);
    setStaged({});
    forceRender({});
  }

  function resetStage() {
    setStaged({});
  }

  return (
    <div className="panel">
      <h2>MiniGit (Client Simulation)</h2>
      <section>
        <h3>Stage Files</h3>
        <div className="form-grid">
          <label>
            Filename
            <input
              value={filename}
              onChange={(event) => setFilename(event.target.value)}
            />
          </label>
          <label>
            Content
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              rows={4}
            />
          </label>
        </div>
        <div className="button-row">
          <button onClick={stageFile}>git add</button>
          <button onClick={commit} disabled={Object.keys(staged).length === 0}>
            git commit
          </button>
          <button onClick={resetStage}>Reset Stage</button>
        </div>
      </section>
      <section>
        <h3>Staging Area</h3>
        {Object.keys(staged).length === 0 ? (
          <p>No staged files.</p>
        ) : (
          <ul>
            {Object.entries(staged).map(([file, data]) => (
              <li key={file}>
                <strong>{file}</strong>
                <pre>{data}</pre>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section>
        <h3>Commit Log</h3>
        <ol>
          {commits.map((commit) => (
            <li key={commit.hash}>
              <strong>{commit.hash}</strong> — {commit.message}
              <div>{commit.timestamp.toLocaleString()}</div>
              <details>
                <summary>Tree</summary>
                <pre>{JSON.stringify(commit.tree, null, 2)}</pre>
              </details>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
