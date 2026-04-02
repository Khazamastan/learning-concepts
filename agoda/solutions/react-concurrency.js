"use strict";

const React = require("react");

const { Suspense, useMemo, useState, useTransition } = React;

/**
 * Demonstrates concurrent rendering with startTransition and Suspense.
 * Non-urgent updates (search results) are marked as transitions so typing stays snappy.
 */
function SearchBox({ fetchResults }) {
  const [term, setTerm] = useState("");
  const [resource, setResource] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleChange = (event) => {
    const next = event.target.value;
    setTerm(next);
    startTransition(() => {
      setResource(fetchResults(next));
    });
  };

  return (
    <div className="search-box">
      <input value={term} onChange={handleChange} placeholder="Search…" />
      {isPending && <div className="spinner">Loading…</div>}
      <Suspense fallback={<div>Preparing results…</div>}>
        <DeferredResults resource={resource} />
      </Suspense>
    </div>
  );
}

function DeferredResults({ resource }) {
  const items = useMemo(() => (resource ? resource.read() : []), [resource]);

  if (!items.length) {
    return <div className="empty-state">Start typing to search.</div>;
  }

  return (
    <ul className="results">
      {items.map((item) => (
        <li key={item.id}>{item.label}</li>
      ))}
    </ul>
  );
}

module.exports = { SearchBox, DeferredResults };
