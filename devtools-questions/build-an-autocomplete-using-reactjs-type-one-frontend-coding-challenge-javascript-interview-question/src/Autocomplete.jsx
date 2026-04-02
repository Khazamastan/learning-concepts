import * as React from "react";

const NAV_KEYS = ["ArrowDown", "ArrowUp", "Enter", "Escape", "Tab"];

export function Autocomplete({ items, placeholder = "" }) {
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const listboxRef = React.useRef(null);
  const inputRef = React.useRef(null);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return items
      .filter((item) => item.toLowerCase().includes(lower))
      .slice(0, 8);
  }, [items, query]);

  React.useEffect(() => {
    setActiveIndex(filtered.length ? 0 : -1);
  }, [query, filtered.length]);

  const handleKeyDown = (event) => {
    if (!NAV_KEYS.includes(event.key)) return;

    if (!filtered.length && event.key !== "Escape") {
      return;
    }

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % filtered.length);
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        setActiveIndex((prev) => (prev + filtered.length - 1) % filtered.length);
        break;
      }
      case "Enter": {
        if (activeIndex >= 0) {
          event.preventDefault();
          commitValue(filtered[activeIndex]);
        }
        break;
      }
      case "Escape": {
        event.preventDefault();
        commitValue("");
        break;
      }
      default:
        break;
    }
  };

  const commitValue = (value) => {
    setQuery(value);
    setActiveIndex(-1);
  };

  const activeId = activeIndex >= 0 ? `autocomplete-option-${activeIndex}` : undefined;

  return (
    <div className="autocomplete">
      <label className="field-label" htmlFor="autocomplete-input">
        Destination city
      </label>
      <div className="field-wrapper">
        <input
          ref={inputRef}
          id="autocomplete-input"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          aria-autocomplete="list"
          aria-expanded={Boolean(filtered.length)}
          aria-activedescendant={activeId}
          aria-controls="autocomplete-listbox"
          role="combobox"
          placeholder={placeholder}
        />
      </div>
      <ul
        ref={listboxRef}
        id="autocomplete-listbox"
        role="listbox"
        className="suggestions"
      >
        {filtered.length === 0 && query ? (
          <li className="empty">No matches found</li>
        ) : (
          filtered.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={item}>
                <button
                  type="button"
                  id={`autocomplete-option-${index}`}
                  role="option"
                  aria-selected={isActive}
                  className={isActive ? "option option--active" : "option"}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    commitValue(item);
                    requestAnimationFrame(() => {
                      inputRef.current?.focus();
                    });
                  }}
                >
                  {highlightMatch(item, query)}
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

function highlightMatch(text, query) {
  if (!query) return text;
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);
  if (index === -1) return text;
  return (
    <span>
      {text.slice(0, index)}
      <mark>{text.slice(index, index + query.length)}</mark>
      {text.slice(index + query.length)}
    </span>
  );
}
