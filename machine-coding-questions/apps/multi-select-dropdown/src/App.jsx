import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';

const OPTIONS = [
  'Analytics',
  'Billing',
  'Conversion',
  'Customer Success',
  'Design Systems',
  'Documentation',
  'Infrastructure',
  'Localization',
  'Performance',
  'Security',
  'Testing',
  'UX Research'
];

export default function App() {
  const [selected, setSelected] = useState(() => new Set(['Analytics', 'Performance']));
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const filteredOptions = useMemo(() => {
    const lowercase = query.toLowerCase();
    return OPTIONS.filter((option) => !selected.has(option) && option.toLowerCase().includes(lowercase));
  }, [query, selected]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const addOption = (option) => {
    setSelected((prev) => new Set(prev).add(option));
    setQuery('');
    inputRef.current?.focus();
  };

  const removeOption = (option) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(option);
      return next;
    });
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Backspace' && query === '' && selected.size > 0) {
      const last = Array.from(selected).at(-1);
      if (last) removeOption(last);
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <main className="multi-shell">
      <section className="multi-card">
        <header>
          <p className="eyebrow">Target audiences</p>
          <h1>Multi-Select Dropdown</h1>
          <p className="support">Select multiple tags. Type to filter. Backspace removes the last chip.</p>
        </header>
        <div className="combobox">
          <div className="chip-row" onClick={() => { setIsOpen(true); inputRef.current?.focus(); }}>
            {Array.from(selected).map((option) => (
              <span key={option} className="chip">
                {option}
                <button type="button" aria-label={`Remove ${option}`} onClick={() => removeOption(option)}>
                  ×
                </button>
              </span>
            ))}
            <input
              ref={inputRef}
              value={query}
              onChange={(event) => { setQuery(event.target.value); setIsOpen(true); }}
              onKeyDown={handleInputKeyDown}
              placeholder={selected.size === 0 ? 'Search expertise…' : ''}
              aria-expanded={isOpen}
              aria-controls="tag-options"
            />
          </div>
          {isOpen && (
            <ul id="tag-options" role="listbox" className="options">
              {filteredOptions.length === 0 ? (
                <li className="empty">No matches</li>
              ) : (
                filteredOptions.map((option) => (
                  <li key={option} role="option">
                    <button type="button" onClick={() => addOption(option)}>
                      {option}
                    </button>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
