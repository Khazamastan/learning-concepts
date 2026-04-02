import * as React from "react";
import { calculateTotals } from "./pricing.js";

const INVENTORY = [
  {
    id: "hoodie",
    name: "DevTools Hoodie",
    description: "Midweight fleece, charcoal grey",
    price: 48,
    image: "🧥",
  },
  {
    id: "mug",
    name: "Coffee Mug",
    description: "Ceramic, matte black 12oz",
    price: 16,
    image: "☕️",
  },
  {
    id: "stickers",
    name: "Sticker Pack",
    description: "5 die-cut vinyl stickers",
    price: 9,
    image: "✨",
  },
];

export function ShoppingCartCheckout() {
  const [items, setItems] = React.useState(() =>
    INVENTORY.map((product) => ({ ...product, quantity: product.id === "hoodie" ? 1 : 0 })),
  );
  const [promoCode, setPromoCode] = React.useState("");
  const [attemptedCode, setAttemptedCode] = React.useState(null);

  const totals = calculateTotals(items, promoCode);

  const updateQuantity = (id, quantity) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, Math.min(10, Number(quantity) || 0)) }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    updateQuantity(id, 0);
  };

  const handleApplyCode = (event) => {
    event.preventDefault();
    setAttemptedCode(promoCode.trim().toUpperCase());
  };

  const isCodeApplied = totals.appliedCode && attemptedCode === totals.appliedCode;
  const hasDiscount = totals.discount > 0;

  return (
    <div className="checkout-app">
      <header>
        <h1>Shopping Cart Checkout</h1>
        <p>Adjust quantities, apply promo codes, and review the order summary before completing checkout.</p>
      </header>
      <div className="layout">
        <section className="card items-card">
          <h2>Items</h2>
          <ul className="items">
            {items.map((item) => (
              <li key={item.id}>
                <div className="thumb" aria-hidden="true">
                  {item.image}
                </div>
                <div className="info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="price">${item.price.toFixed(2)}</span>
                </div>
                <div className="actions">
                  <label>
                    Qty
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, event.target.value)}
                    />
                  </label>
                  <button type="button" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <form className="promo" onSubmit={handleApplyCode}>
            <label htmlFor="promo">Promo code</label>
            <div className="promo-row">
              <input
                id="promo"
                value={promoCode}
                onChange={(event) => setPromoCode(event.target.value)}
                placeholder="SAVE10, FREESHIP..."
              />
              <button type="submit">Apply</button>
            </div>
            {attemptedCode && !isCodeApplied && (
              <p className="error">Code {attemptedCode} isn&apos;t eligible for this order.</p>
            )}
            {isCodeApplied && hasDiscount && <p className="success">Code {totals.appliedCode} applied!</p>}
          </form>
        </section>

        <section className="card summary-card">
          <h2>Order summary</h2>
          <dl>
            <div>
              <dt>Subtotal</dt>
              <dd>${totals.subtotal.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Discount</dt>
              <dd className={hasDiscount ? "negative" : ""}>${totals.discount.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>${totals.shipping.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Tax (8%)</dt>
              <dd>${totals.tax.toFixed(2)}</dd>
            </div>
            <div className="total">
              <dt>Total</dt>
              <dd>${totals.total.toFixed(2)}</dd>
            </div>
          </dl>
          <button type="button" className="checkout-button" disabled={totals.subtotal === 0}>
            Proceed to payment
          </button>
          <p className="footnote">
            Orders above ${SHIPPING_THRESHOLD} ship free automatically. Promo codes stack with free shipping when
            eligible.
          </p>
        </section>
      </div>
    </div>
  );
}

const SHIPPING_THRESHOLD = 75;
