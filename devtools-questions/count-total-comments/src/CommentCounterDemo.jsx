import * as React from "react";
import { countComments } from "./countComments.js";

const SAMPLE = [
  {
    id: 1,
    author: "Rahul",
    text: "Great article!",
    replies: [
      { id: 2, author: "Nisha", text: "Agreed 👏", replies: [] },
      {
        id: 3,
        author: "Sameer",
        text: "Do you have more resources?",
        replies: [
          { id: 4, author: "Rahul", text: "Sure, I'll share soon.", replies: [] },
          {
            id: 5,
            author: "Anita",
            text: "Following along.",
            replies: [{ id: 6, author: "Karan", text: "Same here!", replies: [] }],
          },
        ],
      },
    ],
  },
  {
    id: 7,
    author: "Priya",
    text: "Thanks for compiling this.",
    replies: [],
  },
];

export function CommentCounterDemo() {
  const [json, setJson] = React.useState(JSON.stringify(SAMPLE, null, 2));
  const [result, setResult] = React.useState(countComments(SAMPLE));
  const [error, setError] = React.useState(null);

  const handleCount = () => {
    try {
      const parsed = JSON.parse(json);
      const total = countComments(parsed);
      setResult(total);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResult(0);
    }
  };

  return (
    <div className="comments-app">
      <header>
        <h1>Count Total Comments</h1>
        <p>
          Count nested comments recursively. Works with arrays or individual nodes containing a <code>replies</code>{" "}
          array.
        </p>
      </header>

      <section className="card editor-card">
        <label htmlFor="comment-json">Comments JSON</label>
        <textarea
          id="comment-json"
          rows={12}
          value={json}
          onChange={(event) => setJson(event.target.value)}
        />
        <button type="button" onClick={handleCount}>
          Count comments
        </button>
        {error && <p className="error">Parse error: {error}</p>}
      </section>

      <section className="card result-card">
        <h2>Total comments</h2>
        <p className="result">{result}</p>
        <p className="hint">
          Implementation: depth-first traversal counts the current comment and recurses into its replies.
        </p>
      </section>
    </div>
  );
}
