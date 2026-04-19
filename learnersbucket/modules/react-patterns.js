import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Problem: Create Multi-Stepper component in React.
 */
export function Stepper({ steps }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <h3>{steps[active]}</h3>
      <p>
        Step {active + 1} of {steps.length}
      </p>
      <button onClick={() => setActive((s) => Math.max(0, s - 1))} disabled={active === 0}>
        Prev
      </button>
      <button
        onClick={() => setActive((s) => Math.min(steps.length - 1, s + 1))}
        disabled={active === steps.length - 1}
      >
        Next
      </button>
    </div>
  );
}

/**
 * Problem: Capture product visible on viewport when user stops scrolling (React).
 */
export function ProductVisibilityTracker({ products }) {
  const refs = useRef(new Map());
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    let timer = null;

    function onScroll() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const ids = [];
        for (const [id, node] of refs.current.entries()) {
          const r = node.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) ids.push(id);
        }
        setVisible(ids);
      }, 200);
    }

    window.addEventListener('scroll', onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div>
      <pre>{JSON.stringify(visible)}</pre>
      {products.map((p) => (
        <div key={p.id} ref={(el) => el && refs.current.set(p.id, el)} style={{ height: 200 }}>
          {p.id}
        </div>
      ))}
    </div>
  );
}

/**
 * Problem: Editable todo list in React.
 */
export function EditableTodoList() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);

  const add = () => {
    if (!text.trim()) return;
    setTodos((arr) => [...arr, { id: Date.now(), text, done: false }]);
    setText('');
  };

  const update = (id, patch) => {
    setTodos((arr) => arr.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add todo" />
      <button onClick={add}>Add</button>
      {todos.map((todo) => (
        <div key={todo.id}>
          <input type="checkbox" checked={todo.done} onChange={() => update(todo.id, { done: !todo.done })} />
          <input value={todo.text} onChange={(e) => update(todo.id, { text: e.target.value })} />
          <button onClick={() => setTodos((arr) => arr.filter((x) => x.id !== todo.id))}>Delete</button>
        </div>
      ))}
    </div>
  );
}

/**
 * Problem: Functional Modal Component.
 */
export function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)' }}>
      <div onClick={(e) => e.stopPropagation()} style={{ margin: '10% auto', width: 320, background: '#fff', padding: 16 }}>
        {children}
      </div>
    </div>
  );
}

/**
 * Problem: Responsive slideshow gallery.
 */
export function SlideShow({ images }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((x) => (x - 1 + images.length) % images.length);
  const next = () => setIndex((x) => (x + 1) % images.length);

  return (
    <div>
      <img src={images[index]} alt="slide" style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }} />
      <button onClick={prev}>Prev</button>
      <button onClick={next}>Next</button>
    </div>
  );
}

/**
 * Problem: Search with Autocomplete in React.
 */
export function AutoComplete({ items }) {
  const [query, setQuery] = useState('');

  const suggestions = useMemo(
    () => items.filter((x) => x.toLowerCase().includes(query.toLowerCase())).slice(0, 5),
    [items, query]
  );

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {suggestions.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Problem: Image auto carousel in React.
 */
export function AutoCarousel({ images, interval = 2000 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((x) => (x + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return <img src={images[index]} alt="carousel" style={{ width: '100%' }} />;
}

/**
 * Problem: Create scroll indicator in React.
 */
export function ScrollIndicator() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const top = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (top / total) * 100 : 0);
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div style={{ position: 'fixed', top: 0, left: 0, height: 4, width: `${progress}%`, background: 'green' }} />;
}

/**
 * Problem: Pagination component helpers.
 */
export function getPaginationModel(totalItems, perPage, current) {
  const totalPages = Math.ceil(totalItems / perPage);
  const pages = [];

  for (let p = 1; p <= totalPages; p += 1) {
    if (p === 1 || p === totalPages || Math.abs(p - current) <= 1) pages.push(p);
  }

  const compact = [];
  for (let i = 0; i < pages.length; i += 1) {
    if (i > 0 && pages[i] !== pages[i - 1] + 1) compact.push('...');
    compact.push(pages[i]);
  }

  return { totalPages, current, pages: compact };
}

/**
 * Problem: Create usePrevious() hook.
 */
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * Problem: usePageVisits() hook.
 */
export function usePageVisits(pathname) {
  const [visits, setVisits] = useState({});

  useEffect(() => {
    setVisits((v) => ({ ...v, [pathname]: (v[pathname] || 0) + 1 }));
  }, [pathname]);

  return visits;
}

/**
 * Problem: Switch-Case component in React.
 */
export function SwitchCase({ value, cases, defaultCase = null }) {
  return cases[value] ?? defaultCase;
}

/**
 * Problem: Code a Todo card list.
 */
export function TodoCardList({ initial = [] }) {
  const [todos, setTodos] = useState(initial);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id} style={{ border: '1px solid #ddd', marginBottom: 8, padding: 12 }}>
          <h4>{todo.title}</h4>
          <p>{todo.desc}</p>
          <span>{todo.done ? 'Done' : 'Pending'}</span>
          <button
            onClick={() =>
              setTodos((arr) =>
                arr.map((x) => (x.id === todo.id ? { ...x, done: !x.done } : x))
              )
            }
          >
            Toggle
          </button>
        </div>
      ))}
    </div>
  );
}

/**
 * Problem: Maintain timer state during page navigation.
 */
export function PersistentTimer({ initial = 120 }) {
  const [remaining, setRemaining] = useState(() => Number(localStorage.getItem('timer') || initial));

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining((prev) => {
        const next = Math.max(0, prev - 1);
        localStorage.setItem('timer', String(next));
        return next;
      });
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Remaining: {remaining}s</p>;
}
