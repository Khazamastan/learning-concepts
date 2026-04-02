import { useMemo, useState } from 'react';

const INITIAL_ITEMS = [
  'Analytics',
  'Billing',
  'Campaigns',
  'Dashboards',
  'Engagement',
  'Feedback',
  'Growth',
  'Integrations',
];

export default function App() {
  const [available, setAvailable] = useState(INITIAL_ITEMS);
  const [selected, setSelected] = useState([]);
  const [leftSelection, setLeftSelection] = useState(new Set());
  const [rightSelection, setRightSelection] = useState(new Set());

  const isTransferDisabled = useMemo(
    () => leftSelection.size === 0,
    [leftSelection],
  );

  const isReturnDisabled = useMemo(
    () => rightSelection.size === 0,
    [rightSelection],
  );

  const moveRight = () => {
    if (leftSelection.size === 0) return;
    const toMove = available.filter((item) => leftSelection.has(item));
    setAvailable((prev) => prev.filter((item) => !leftSelection.has(item)));
    setSelected((prev) => [...prev, ...toMove]);
    setLeftSelection(new Set());
  };

  const moveLeft = () => {
    if (rightSelection.size === 0) return;
    const toMove = selected.filter((item) => rightSelection.has(item));
    setSelected((prev) => prev.filter((item) => !rightSelection.has(item)));
    setAvailable((prev) => [...prev, ...toMove]);
    setRightSelection(new Set());
  };

  const toggleLeft = (item) => {
    setLeftSelection((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  const toggleRight = (item) => {
    setRightSelection((prev) => {
      const next = new Set(prev);
      if (next.has(item)) {
        next.delete(item);
      } else {
        next.add(item);
      }
      return next;
    });
  };

  return (
    <div className="app">
      <h1>Transfer List</h1>
      <p className="description">
        Select items from either list and use the controls to move them.
      </p>
      <div className="transfer-list">
        <ListPanel
          title={`Available (${available.length})`}
          items={available}
          selectedItems={leftSelection}
          onToggle={toggleLeft}
          dataTestId="available-list"
        />
        <Controls
          onMoveRight={moveRight}
          onMoveLeft={moveLeft}
          disableMoveRight={isTransferDisabled}
          disableMoveLeft={isReturnDisabled}
        />
        <ListPanel
          title={`Selected (${selected.length})`}
          items={selected}
          selectedItems={rightSelection}
          onToggle={toggleRight}
          dataTestId="selected-list"
        />
      </div>
    </div>
  );
}

function ListPanel({ title, items, selectedItems, onToggle, dataTestId }) {
  return (
    <section className="panel" aria-label={title} data-testid={dataTestId}>
      <header className="panel__header">
        <h2>{title}</h2>
        <span>{selectedItems.size} selected</span>
      </header>
      <ul className="panel__list">
        {items.map((item) => {
          const checked = selectedItems.has(item);
          return (
            <li key={item}>
              <label className={checked ? 'is-selected' : ''}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item)}
                />
                <span>{item}</span>
              </label>
            </li>
          );
        })}
        {items.length === 0 && (
          <li className="panel__empty">No items</li>
        )}
      </ul>
    </section>
  );
}

function Controls({ onMoveRight, onMoveLeft, disableMoveRight, disableMoveLeft }) {
  return (
    <div className="controls" aria-label="Transfer controls">
      <button type="button" onClick={onMoveRight} disabled={disableMoveRight}>
        Move →
      </button>
      <button type="button" onClick={onMoveLeft} disabled={disableMoveLeft}>
        ← Move
      </button>
    </div>
  );
}
