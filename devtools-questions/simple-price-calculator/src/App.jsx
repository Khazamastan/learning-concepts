import { useMemo, useState } from 'react';
import './styles.css';

export default function App() {
  const [price, setPrice] = useState(49);
  const [quantity, setQuantity] = useState(5);
  const [discount, setDiscount] = useState(10);
  const [taxRate, setTaxRate] = useState(7.5);

  const summary = useMemo(() => {
    const subtotal = price * quantity;
    const discountAmount = (subtotal * discount) / 100;
    const taxed = (subtotal - discountAmount) * (taxRate / 100);
    const total = subtotal - discountAmount + taxed;

    return {
      subtotal,
      discountAmount,
      taxed,
      total,
    };
  }, [price, quantity, discount, taxRate]);

  return (
    <main className="price-calculator">
      <header>
        <h1>Simple Price Calculator</h1>
        <p>Model pricing scenarios with discount and tax.</p>
      </header>
      <section className="price-calculator__grid">
        <div className="price-calculator__form">
          <label>
            Base price ($)
            <input
              type="number"
              min="0"
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
            />
          </label>
          <label>
            Quantity
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(Number(event.target.value))}
            />
          </label>
          <label>
            Discount (%)
            <input
              type="number"
              min="0"
              max="100"
              value={discount}
              onChange={(event) => setDiscount(Number(event.target.value))}
            />
          </label>
          <label>
            Tax rate (%)
            <input
              type="number"
              min="0"
              max="25"
              value={taxRate}
              onChange={(event) => setTaxRate(Number(event.target.value))}
            />
          </label>
        </div>
        <aside className="price-calculator__summary">
          <h2>Summary</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>${summary.subtotal.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Discount</dt>
              <dd>-${summary.discountAmount.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Tax</dt>
              <dd>${summary.taxed.toFixed(2)}</dd>
            </div>
          </dl>
          <footer>
            <span>Total due</span>
            <strong>${summary.total.toFixed(2)}</strong>
          </footer>
        </aside>
      </section>
    </main>
  );
}
