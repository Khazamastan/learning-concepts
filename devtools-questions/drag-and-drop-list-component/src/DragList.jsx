import * as React from "react";

const INITIAL_ITEMS = ["Inbox", "In Progress", "Review", "Shipped", "Archived"];

export function DragAndDropList() {
  const [items, setItems] = React.useState(INITIAL_ITEMS);
  const [dragIndex, setDragIndex] = React.useState(null);

  const handleDragStart = (index) => {
    setDragIndex(index);
  };

  const handleDragOver = (event, index) => {
    event.preventDefault();
    if (dragIndex === index) return;
    setItems((current) => {
      const copy = [...current];
      const [removed] = copy.splice(dragIndex, 1);
      copy.splice(index, 0, removed);
      setDragIndex(index);
      return copy;
    });
  };

  const reset = () => setItems(INITIAL_ITEMS);

  return (
    <div className="dnd-app">
      <header>
        <h1>Drag and Drop List Component</h1>
        <p>Reorder items using native HTML5 drag-and-drop events.</p>
      </header>
      <section className="card">
        <ul>
          {items.map((item, index) => (
            <li
              key={item}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(event) => handleDragOver(event, index)}
              aria-grabbed={dragIndex === index}
            >
              <span className="handle" aria-hidden="true">
                ☰
              </span>
              {item}
            </li>
          ))}
        </ul>
        <button type="button" onClick={reset}>
          Reset order
        </button>
      </section>
    </div>
  );
}
