import { useEffect, useState } from 'react';

const API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en';

export default function App() {
  const [query, setQuery] = useState('serendipity');
  const [term, setTerm] = useState('serendipity');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function fetchDefinition(word) {
      if (!word) {
        setEntries([]);
        return;
      }
      setStatus('loading');
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/${word}`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error('No definition found.');
        }
        const data = await response.json();
        if (!ignore) {
          setEntries(data);
          setStatus('success');
        }
      } catch (err) {
        if (!ignore) {
          setEntries([]);
          setStatus('error');
          setError(err.name === 'AbortError' ? null : err.message);
        }
      }
    }

    fetchDefinition(term);
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [term]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTerm(query.trim());
  };

  const activeEntry = entries[0];

  return (
    <div className="dictionary-app">
      <header>
        <h1>Dictionary</h1>
        <p>Search the free dictionary API for quick definitions, phonetics, and synonyms.</p>
        <form onSubmit={handleSubmit} className="search">
          <input
            type="search"
            placeholder="Search for a word..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit" disabled={!query.trim()}>
            Look up
          </button>
        </form>
      </header>

      <section className="results">
        {status === 'loading' && <p className="hint">Fetching definition…</p>}
        {status === 'error' && <p className="error">{error ?? 'Request cancelled.'}</p>}
        {status === 'success' && activeEntry && (
          <article className="entry">
            <header className="entry-header">
              <h2>{activeEntry.word}</h2>
              <span className="phonetic">
                {activeEntry.phonetic ?? activeEntry.phonetics?.[0]?.text ?? ''}
              </span>
            </header>

            {activeEntry.meanings?.map((meaning) => (
              <div key={`${meaning.partOfSpeech}-${meaning.definitions[0]?.definition}`} className="meaning">
                <h3>{meaning.partOfSpeech}</h3>
                <ol>
                  {meaning.definitions.slice(0, 3).map((definition, index) => (
                    <li key={index}>
                      <p>{definition.definition}</p>
                      {definition.example && <blockquote>{definition.example}</blockquote>}
                    </li>
                  ))}
                </ol>
                {meaning.synonyms?.length > 0 && (
                  <p className="synonyms">
                    Synonyms:{' '}
                    {meaning.synonyms.slice(0, 5).map((syn) => (
                      <button
                        key={syn}
                        type="button"
                        className="synonym"
                        onClick={() => {
                          setQuery(syn);
                          setTerm(syn);
                        }}
                      >
                        {syn}
                      </button>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </article>
        )}
        {status === 'success' && !activeEntry && <p className="hint">No definition found.</p>}
      </section>
    </div>
  );
}
