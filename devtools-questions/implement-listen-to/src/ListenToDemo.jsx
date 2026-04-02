import * as React from "react";
import { listenTo } from "./listenTo.js";

const INITIAL_ITEMS = [
  { id: "xl2", label: "Inbox", count: 12 },
  { id: "rm4", label: "In Progress", count: 5 },
  { id: "ok7", label: "Waiting", count: 2 },
  { id: "hp9", label: "Done", count: 28 },
];

export function ListenToDemo() {
  const listRef = React.useRef(null);
  const [items, setItems] = React.useState(INITIAL_ITEMS);
  const [log, setLog] = React.useState([]);

  React.useEffect(() => {
    if (!listRef.current) {
      return undefined;
    }

    const unsubscribe = listenTo(listRef.current, "click", ".kanban-card", (event) => {
      const id = event.currentTarget.dataset.id;
      setLog((entries) => [
        { id: crypto.randomUUID(), message: `Clicked ${id}`, time: new Date() },
        ...entries,
      ]);
    });

    const unsubscribeKey = listenTo(listRef.current, "keydown", ".kanban-card", (event) => {
      if (event.key === "Delete") {
        const id = event.currentTarget.dataset.id;
        setItems((current) => current.filter((item) => item.id !== id));
        setLog((entries) => [
          { id: crypto.randomUUID(), message: `Deleted ${id}`, time: new Date() },
          ...entries,
        ]);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeKey();
    };
  }, []);

  const addCard = () => {
    const id = Math.random().toString(36).slice(2, 6);
    setItems((current) => [
      ...current,
      { id, label: `New Ticket ${current.length + 1}`, count: 0 },
    ]);
  };

  return (
    <div className="listen-demo">
      <header>
        <h1>listenTo Event Delegation</h1>
        <p>
          Attach one listener to parent nodes instead of registering handlers on every
          child. Works with clicks, keyboard events, and bubbling custom events.
        </p>
      </header>
      <section className="board card">
        <button type="button" onClick={addCard} className="primary">
          Add card
        </button>
        <ul ref={listRef} className="kanban-column" aria-label="Status columns">
          {items.map((item) => (
            <li
              key={item.id}
              className="kanban-card"
              data-id={item.id}
              tabIndex={0}
              role="button"
            >
              <span>{item.label}</span>
              <span className="count">{item.count}</span>
            </li>
          ))}
        </ul>
        <p className="hint">
          Click a card to log activity, press Delete to remove it — all handled via the
          delegated listeners.
        </p>
      </section>
      <section className="card">
        <h2>Log</h2>
        <ul className="log">
          {log.map((entry) => (
            <li key={entry.id}>
              <time>{entry.time.toLocaleTimeString()}</time>
              <span>{entry.message}</span>
            </li>
          ))}
        </ul>
        {!log.length && <p>No interactions yet. Click or delete a card to populate the log.</p>}
      </section>
    </div>
  );
}
