# Shopping Cart Checkout

Responsive checkout experience that covers the core pricing concerns: item quantities, promo codes, shipping thresholds, taxes, and total calculation.

## Highlights

- Editable quantities for each line item (0–10 range).
- Promo code engine supporting percentage, flat, and free-shipping rules with minimum order requirements.
- Order summary calculates subtotal, discount, shipping, tax (configurable rate), and grand total.
- Totals update instantly as the cart changes.

## Structure

```
shopping-cart-checkout/
├── index.html
├── package.json
├── src/
│   ├── ShoppingCartCheckout.jsx
│   ├── index.jsx
│   ├── pricing.js
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd shopping-cart-checkout
npm install
npm run dev
```

Navigate to `http://localhost:5173`.

## Pricing logic

- `calculateTotals` accepts cart items and an optional promo code.
- Shipping is free once the subtotal meets `SHIPPING_THRESHOLD`; otherwise a flat fee applies.
- Promo rules are defined declaratively (`PROMO_CODES`) allowing easy extension.
- Taxes are computed on the post-discount subtotal and added to the final total.

Use this as a foundation for integrating real payments or server-side tax/shipping providers.
