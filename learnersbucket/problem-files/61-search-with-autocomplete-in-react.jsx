import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Problem #61: Search with Autocomplete in React
 *
 * Detailed Problem Statement:
 * Build autocomplete input that filters suggestions and supports keyboard selection.
 *
 * Example Input:
 * Input: "ap"
 * Data: ["apple", "apricot", "banana"]
 *
 * Example Output:
 * Suggestions: ["apple", "apricot"]
 */

export const problem = 'Search with Autocomplete in React';

export const statement = `
Build autocomplete input that filters suggestions and supports keyboard selection.
`.trim();

export const exampleInput = `
Input: "ap"
Data: ["apple", "apricot", "banana"]
`.trim();

export const exampleOutput = `
Suggestions: ["apple", "apricot"]
`.trim();

const DEFAULT_ITEMS = [
  'apple',
  'apricot',
  'banana',
  'blueberry',
  'cherry',
  'grapes',
  'mango',
  'orange',
  'pineapple'
];

// Approach 1: Local filtering + keyboard navigation
export function AutoCompleteSolution1({ items = DEFAULT_ITEMS }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);

  const results = useMemo(
    () => items.filter((x) => x.toLowerCase().includes(query.toLowerCase())).slice(0, 6),
    [items, query]
  );

  const select = (value) => {
    setQuery(value);
    setActive(-1);
  };

  return (
    <section>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(-1);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') setActive((a) => Math.min(a + 1, results.length - 1));
          if (e.key === 'ArrowUp') setActive((a) => Math.max(a - 1, 0));
          if (e.key === 'Enter' && active >= 0) select(results[active]);
        }}
        placeholder="Search fruits"
      />

      <ul style={{ listStyle: 'none', paddingLeft: 0, marginTop: 8 }}>
        {results.map((item, idx) => (
          <li
            key={item}
            onMouseDown={() => select(item)}
            style={{
              padding: '6px 8px',
              cursor: 'pointer',
              background: idx === active ? '#efefef' : '#fff'
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

// Approach 2: Debounced async suggestions
export function AutoCompleteSolution2({
  fetchSuggestions = async (q) =>
    DEFAULT_ITEMS.filter((x) => x.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const data = await fetchSuggestions(query);
      setResults(data);
    }, 200);

    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  return (
    <section>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Async search" />
      <div style={{ marginTop: 8 }}>
        {results.map((r) => (
          <button key={r} onClick={() => setQuery(r)} style={{ marginRight: 6 }}>
            {r}
          </button>
        ))}
      </div>
    </section>
  );
}

// Approach 3: Cached async search
export function AutoCompleteSolution3({
  fetchSuggestions = async (q) =>
    DEFAULT_ITEMS.filter((x) => x.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
}) {
  const cache = useRef(new Map());
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    let ignore = false;

    async function run() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      if (cache.current.has(query)) {
        setResults(cache.current.get(query));
        return;
      }

      const next = await fetchSuggestions(query);
      cache.current.set(query, next);
      if (!ignore) setResults(next);
    }

    run();

    return () => {
      ignore = true;
    };
  }, [query, fetchSuggestions]);

  return (
    <section>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cached search" />
      <ul>
        {results.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default AutoCompleteSolution1;
