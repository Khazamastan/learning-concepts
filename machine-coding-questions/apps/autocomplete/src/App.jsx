import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import './styles.css';

const DATASET = [
  'Add comment',
  'Allocate budget',
  'Apply labels',
  'Archive sprint',
  'Assign reviewer',
  'Cancel deploy',
  'Create branch',
  'Create incident',
  'Deploy staging',
  'Escalate issue',
  'Generate report',
  'Invite teammate',
  'Lock resource',
  'Merge pull request',
  'Open dashboard',
  'Pause rollout',
  'Plan roadmap',
  'Rebuild cache',
  'Restart server',
  'Schedule release',
  'Trigger workflow',
  'Update snapshot'
];

function simulateFetch(query) {
  return new Promise((resolve) => {
    const normalized = query.toLowerCase();
    const results = DATASET.filter((item) => item.toLowerCase().includes(normalized)).slice(0, 8);
    const latency = 200 + Math.random() * 400;
    setTimeout(() => resolve(results), latency);
  });
}

export default function App() {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef();
  const cacheRef = useRef(new Map());
  const activeRequest = useRef(0);

  useEffect(() => {
    if (!input.trim()) {
      setSuggestions([]);
      setLoading(false);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    const requestId = ++activeRequest.current;

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      if (cacheRef.current.has(input)) {
        startTransition(() => setSuggestions(cacheRef.current.get(input)));
        setLoading(false);
        return;
      }
      try {
        const result = await simulateFetch(input);
        if (requestId === activeRequest.current) {
          cacheRef.current.set(input, result);
          startTransition(() => setSuggestions(result));
          setLoading(false);
        }
      } catch (fetchError) {
        if (requestId === activeRequest.current) {
          setError('Failed to load suggestions');
          setLoading(false);
        }
      }
    }, 250);

    return () => clearTimeout(debounceRef.current);
  }, [input, startTransition]);

  const highlightedSuggestions = useMemo(() => {
    const query = input.trim().toLowerCase();
    if (!query) return suggestions.map((text) => ({ text, highlight: text }));
    return suggestions.map((text) => {
      const lower = text.toLowerCase();
      const index = lower.indexOf(query);
      if (index === -1) return { text, highlight: text };
      const before = text.slice(0, index);
      const match = text.slice(index, index + query.length);
      const after = text.slice(index + query.length);
      return { text, highlight: `${before}<mark>${match}</mark>${after}` };
    });
  }, [suggestions, input]);

  return (
    <main className="auto-shell">
      <section className="auto-card">
        <header>
          <p className="eyebrow">Command palette</p>
          <h1>Autocomplete</h1>
          <p className="support">Debounced requests with caching for repeat queries.</p>
        </header>
        <label className="field">
          <span>Search actions</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Try typing “deploy”…"
            aria-autocomplete="list"
            aria-controls="autocomplete-options"
            autoComplete="off"
          />
        </label>
        <div className="status" aria-live="polite">
          {loading || isPending ? 'Fetching…' : error || `${suggestions.length} suggestion(s)`}
        </div>
        {(loading || suggestions.length > 0) && (
          <ul id="autocomplete-options" className="options" role="listbox">
            {loading && suggestions.length === 0 ? (
              <li className="placeholder">Searching…</li>
            ) : suggestions.length === 0 ? (
              <li className="placeholder">No matches</li>
            ) : (
              highlightedSuggestions.map((item) => (
                <li key={item.text} role="option" dangerouslySetInnerHTML={{ __html: item.highlight }} />
              ))
            )}
          </ul>
        )}
      </section>
    </main>
  );
}
