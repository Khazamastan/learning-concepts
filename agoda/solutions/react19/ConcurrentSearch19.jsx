import { cache, useMemo, useState, useTransition, useOptimistic } from "react";

/**
 * Simulated async search that filters a dataset.
 * `cache` memoizes the fetch function across renders (new in React 19).
 */
const fetchResults = cache(async (query) => {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const data = SAMPLE_DATA.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  return data.slice(0, 10);
});

const SAMPLE_DATA = Array.from({ length: 2000 }, (_, index) => ({
  id: index + 1,
  label: `Result ${index + 1}`,
}));

export default function ConcurrentSearch19() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isPending, startTransition] = useTransition();
  const [optimisticTerm, updateOptimisticTerm] = useOptimistic(term, (_, next) => next);

  const handleChange = (event) => {
    const next = event.target.value;
    updateOptimisticTerm(next);
    setTerm(next);
    startTransition(async () => {
      const data = next ? await fetchResults(next) : [];
      setResults(data);
    });
  };

  const listItems = useMemo(
    () =>
      results.map((item) => (
        <li key={item.id} style={{ padding: "4px 0" }}>
          {item.label}
        </li>
      )),
    [results]
  );

  return (
    <section>
      <h2>Concurrent Search (React 19)</h2>
      <p style={{ color: "#555" }}>
        Typing updates the optimistic input instantly while results stream in through a concurrent transition.
      </p>
      <label>
        Search term
        <input
          type="search"
          value={optimisticTerm}
          onChange={handleChange}
          placeholder="Type to filter results…"
          style={{ marginLeft: 8 }}
        />
      </label>
      {isPending && <p style={{ color: "#888" }}>Updating results…</p>}
      <ul>{listItems}</ul>
    </section>
  );
}
