import * as React from "react";
import { createCallCounter } from "./callCounter.js";

const operations = [
  {
    label: "Add to cart",
    fn: (cart, item) => cart.concat(item),
  },
  {
    label: "Format currency",
    fn: (amount) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount),
  },
  {
    label: "Generate ID",
    fn: () => crypto.randomUUID(),
  },
];

export function CallCounterDemo() {
  const counters = React.useMemo(
    () => operations.map((operation) => ({ ...operation, wrapped: createCallCounter(operation.fn, { label: operation.label }) })),
    [],
  );

  const [cart, setCart] = React.useState([]);
  const [log, setLog] = React.useState([]);

  const runOperation = (operation) => {
    let result;
    if (operation.label === "Add to cart") {
      const newItem = { id: crypto.randomUUID(), name: `Item ${cart.length + 1}`, price: randomPrice() };
      result = operation.wrapped(cart, newItem);
      setCart(result);
      setLog((entries) => [
        { id: crypto.randomUUID(), message: `Added ${newItem.name} (${formatCurrency(newItem.price)})` },
        ...entries,
      ]);
    } else if (operation.label === "Format currency") {
      result = operation.wrapped(randomPrice());
      setLog((entries) => [{ id: crypto.randomUUID(), message: `Formatted: ${result}` }, ...entries]);
    } else {
      result = operation.wrapped();
      setLog((entries) => [{ id: crypto.randomUUID(), message: `Generated ID: ${result}` }, ...entries]);
    }
  };

  const resetCounters = () => {
    counters.forEach((operation) => operation.wrapped.reset());
    setLog([]);
    setCart([]);
  };

  return (
    <div className="counter-demo">
      <header>
        <h1>Function Call Counter</h1>
        <p>
          Wrap a function and track how many times it’s invoked. Useful for debugging memoization, caching, or confirming
          event handler frequency.
        </p>
      </header>

      <section className="card operations-card">
        <h2>Operations</h2>
        <div className="buttons">
          {counters.map((operation) => (
            <button key={operation.label} type="button" onClick={() => runOperation(operation)}>
              {operation.label} <span className="count">({operation.wrapped.getCount()})</span>
            </button>
          ))}
        </div>
        <button type="button" className="reset" onClick={resetCounters}>
          Reset counters
        </button>
      </section>

      <section className="card state-card">
        <h2>Cart ({cart.length})</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} – {formatCurrency(item.price)}
            </li>
          ))}
        </ul>
        {!cart.length && <p>No cart items yet. Click “Add to cart”.</p>}
      </section>

      <section className="card log-card">
        <h2>Log</h2>
        <ul>
          {log.map((entry) => (
            <li key={entry.id}>{entry.message}</li>
          ))}
        </ul>
        {!log.length && <p>No entries yet. Trigger an operation to log output and increment counters.</p>}
      </section>
    </div>
  );
}

function randomPrice() {
  return Math.floor(Math.random() * 4000) + 500;
}

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
}
