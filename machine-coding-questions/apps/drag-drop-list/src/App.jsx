import { useMemo, useRef, useState } from 'react';
import './styles.css';

const INITIAL_ITEMS = [
  { id: 'backlog', title: 'Backlog grooming' },
  { id: 'design', title: 'Design QA' },
  { id: 'build', title: 'Implement feature' },
  { id: 'review', title: 'Code review' },
  { id: 'launch', title: 'Launch checklist' }
];

function reorder(list, startIndex, endIndex) {
  const next = [...list];
  const [removed] = next.splice(startIndex, 1);
  next.splice(endIndex, 0, removed);
  return next;
}

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [overId, setOverId] = useState(null);
  const dragIndexRef = useRef(null);

  const positions = useMemo(() => new Map(items.map((item, index) => [item.id, index + 1])), [items]);

  const handleDragStart = (id) => (event) => {
    dragIndexRef.current = items.findIndex((item) => item.id === id);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', id);
  };

  const handleDragOver = (id) => (event) => {
    event.preventDefault();
    const index = items.findIndex((item) => item.id === id);
    if (index >= 0) setOverId(id);
  };

  const handleDrop = (id) => (event) => {
    event.preventDefault();
    const fromIndex = dragIndexRef.current;
    const toIndex = items.findIndex((item) => item.id === id);
    if (fromIndex >= 0 && toIndex >= 0 && fromIndex !== toIndex) {
      setItems((list) => reorder(list, fromIndex, toIndex));
    }
    setOverId(null);
  };

  const handleDragEnd = () => {
    setOverId(null);
    dragIndexRef.current = null;
  };

  return (
    <main className="dnd-shell">
      <section className="dnd-card">
        <header>
          <p className="eyebrow">Sprint planner</p>
          <h1>Drag & Drop List</h1>
          <p className="support">Reorder items with native HTML5 drag events. Positions update instantly.</p>
        </header>
        <ol className="list">
          {items.map((item) => (
            <li
              key={item.id}
              draggable
              onDragStart={handleDragStart(item.id)}
              onDragOver={handleDragOver(item.id)}
              onDrop={handleDrop(item.id)}
              onDragEnd={handleDragEnd}
              className={overId === item.id ? 'card over' : 'card'}
            >
              <span className="position">{positions.get(item.id)}</span>
              <span className="title">{item.title}</span>
              <span className="hint">Drag ↕</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
