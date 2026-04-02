import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import './styles.css';

const DIRECTORY = [
  { name: 'Alicia Ramos', role: 'Design Lead' },
  { name: 'Benito Chávez', role: 'Data Engineer' },
  { name: 'Cara Price', role: 'Product Manager' },
  { name: 'Devon Patel', role: 'QA Analyst' },
  { name: 'Emily Nguyen', role: 'Frontend Developer' },
  { name: 'Farah Khan', role: 'Security Engineer' },
  { name: 'Gavin Miller', role: 'iOS Developer' },
  { name: 'Hanna Schultz', role: 'Android Developer' },
  { name: 'Iris Johnson', role: 'Customer Success' },
  { name: 'Jackson Lee', role: 'DevRel' },
  { name: 'Karim Osei', role: 'ML Engineer' },
  { name: 'Lena Becker', role: 'Finance Partner' },
  { name: 'Mira Ibarra', role: 'Support Specialist' },
  { name: 'Noah Smith', role: 'Infra Engineer' },
  { name: 'Olivia Chen', role: 'UX Researcher' },
  { name: 'Pablo Hernández', role: 'Solutions Architect' },
  { name: 'Qi Zhang', role: 'Fullstack Developer' },
  { name: 'Ravi Nair', role: 'SRE' },
  { name: 'Sofia Anders', role: 'Marketing' },
  { name: 'Talia Cohen', role: 'Technical Writer' },
  { name: 'Uma Singh', role: 'Project Manager' },
  { name: 'Victor Hugo', role: 'Support Engineer' },
  { name: 'Wendy Li', role: 'bizOps' },
  { name: 'Xavier Moore', role: 'Platform Engineer' },
  { name: 'Yara Haddad', role: 'Legal Counsel' },
  { name: 'Zoe Rivera', role: 'Data Scientist' }
];

const normalize = (value) => value.toLowerCase().trim();
const latency = () => 180 + Math.random() * 420;

function mockDirectorySearch(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const normalized = normalize(query);
      const results = DIRECTORY.filter((entry) =>
        normalize(entry.name).includes(normalized) || normalize(entry.role).includes(normalized)
      );
      resolve(results);
    }, latency());
  });
}

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiHits, setApiHits] = useState(0);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef();
  const cacheRef = useRef(new Map());
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return () => {};
    }

    setLoading(true);
    const requestId = ++requestIdRef.current;
    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      const cached = cacheRef.current.get(query);
      if (cached) {
        startTransition(() => setResults(cached));
        setLoading(false);
        return;
      }

      const data = await mockDirectorySearch(query);
      cacheRef.current.set(query, data);
      if (requestId === requestIdRef.current) {
        startTransition(() => setResults(data));
        setLoading(false);
        setApiHits((count) => count + 1);
      }
    }, 350);

    return () => clearTimeout(debounceRef.current);
  }, [query, startTransition]);

  const suggestions = useMemo(() => {
    if (!query) return DIRECTORY.slice(0, 5);
    return results.slice(0, 8);
  }, [query, results]);

  return (
    <main className="search-shell">
      <section className="search-card" role="search">
        <header>
          <p className="eyebrow">Directory lookup</p>
          <h1>Debounced Search Input</h1>
          <p className="support">
            Type to search employees. Requests are debounced and cached to avoid redundant API calls.
          </p>
        </header>
        <label className="search-field">
          <span className="label-text">Search team</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try “design” or “Noah”"
            aria-label="Search across the organization"
            autoFocus
          />
        </label>
        <section className="status-bar" aria-live="polite">
          {loading || isPending ? (
            <span className="loading">Fetching suggestions…</span>
          ) : query ? (
            <span>{results.length} results</span>
          ) : (
            <span>Showing quick picks</span>
          )}
          <span className="api-hits">API calls: {apiHits}</span>
        </section>
        <ul className="results" role="listbox">
          {suggestions.length === 0 && !loading ? (
            <li className="empty">No matches found. Refine your query.</li>
          ) : (
            suggestions.map((item) => (
              <li key={item.name} role="option" tabIndex={0}>
                <span className="name">{item.name}</span>
                <span className="role">{item.role}</span>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}
