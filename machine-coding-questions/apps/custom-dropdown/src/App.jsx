import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';

const OPTIONS = [
  { value: 'figma', label: 'Figma Design' },
  { value: 'linear', label: 'Linear Issues' },
  { value: 'github', label: 'GitHub Discussions' },
  { value: 'notion', label: 'Notion Docs' },
  { value: 'slack', label: 'Slack Threads' },
  { value: 'loom', label: 'Loom Reviews' }
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(OPTIONS[0].value);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const listRef = useRef(null);
  const buttonRef = useRef(null);

  const selectedOption = useMemo(
    () => OPTIONS.find((option) => option.value === selectedValue) ?? OPTIONS[0],
    [selectedValue]
  );

  useEffect(() => {
    if (!isOpen) return;
    const selectedIndex = OPTIONS.findIndex((option) => option.value === selectedValue);
    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [isOpen, selectedValue]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (
        listRef.current &&
        buttonRef.current &&
        !listRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener('pointerdown', handleClickOutside);
    return () => window.removeEventListener('pointerdown', handleClickOutside);
  }, [isOpen]);

  const openList = () => setIsOpen(true);
  const closeList = () => setIsOpen(false);

  const moveHighlight = (offset) => {
    setHighlightedIndex((current) => {
      const next = (current + offset + OPTIONS.length) % OPTIONS.length;
      return next;
    });
  };

  const commitSelection = (index) => {
    const option = OPTIONS[index];
    if (!option) return;
    setSelectedValue(option.value);
    closeList();
    buttonRef.current?.focus();
  };

  const handleButtonKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) openList();
        moveHighlight(event.key === 'ArrowDown' ? 1 : -1);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        setIsOpen((prev) => !prev);
        break;
      }
      case 'Home':
        event.preventDefault();
        openList();
        setHighlightedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        openList();
        setHighlightedIndex(OPTIONS.length - 1);
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        moveHighlight(1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveHighlight(-1);
        break;
      case 'Enter':
      case ' ': {
        event.preventDefault();
        commitSelection(highlightedIndex);
        break;
      }
      case 'Escape':
        event.preventDefault();
        closeList();
        buttonRef.current?.focus();
        break;
      case 'Home':
        event.preventDefault();
        setHighlightedIndex(0);
        break;
      case 'End':
        event.preventDefault();
        setHighlightedIndex(OPTIONS.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <main className="dropdown-shell">
      <section className="dropdown-card">
        <header>
          <p className="eyebrow">Workspace switcher</p>
          <h1>Custom Dropdown</h1>
          <p className="support">Accessible listbox with keyboard navigation and focus management.</p>
        </header>
        <div className="dropdown">
          <button
            ref={buttonRef}
            type="button"
            className="trigger"
            onClick={() => setIsOpen((prev) => !prev)}
            onKeyDown={handleButtonKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls="workspace-options"
          >
            <span>{selectedOption.label}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          {isOpen && (
            <ul
              id="workspace-options"
              className="options"
              role="listbox"
              aria-activedescendant={`option-${OPTIONS[highlightedIndex].value}`}
              ref={listRef}
              tabIndex={-1}
              onKeyDown={handleListKeyDown}
            >
              {OPTIONS.map((option, index) => {
                const selected = option.value === selectedValue;
                const highlighted = index === highlightedIndex;
                return (
                  <li
                    key={option.value}
                    id={`option-${option.value}`}
                    role="option"
                    aria-selected={selected}
                    tabIndex={-1}
                    className={[
                      'option',
                      highlighted ? 'is-highlighted' : '',
                      selected ? 'is-selected' : ''
                    ].join(' ').trim()}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => commitSelection(index)}
                  >
                    <span>{option.label}</span>
                    {selected && <span className="check">✓</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        <footer className="summary" aria-live="polite">
          <span className="summary-label">Active workspace</span>
          <strong>{selectedOption.label}</strong>
        </footer>
      </section>
    </main>
  );
}
