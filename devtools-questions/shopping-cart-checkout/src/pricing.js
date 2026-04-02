export const TAX_RATE = 0.08;
export const SHIPPING_THRESHOLD = 75;
export const SHIPPING_FEE = 7.5;

const PROMO_CODES = {
  SAVE10: { type: "percent", value: 0.1, minimum: 50 },
  FREESHIP: { type: "shipping", value: SHIPPING_FEE, minimum: 40 },
  TAKE15: { type: "flat", value: 15, minimum: 120 },
};

export function calculateTotals(items, promoCode) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const promo = sanitizeCode(promoCode);
  let discount = 0;
  let shipping = subtotal >= SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_FEE;

  if (promo && PROMO_CODES[promo]) {
    const rule = PROMO_CODES[promo];
    if (subtotal >= rule.minimum) {
      switch (rule.type) {
        case "percent":
          discount = subtotal * rule.value;
          break;
        case "flat":
          discount = rule.value;
          break;
        case "shipping":
          discount = Math.min(rule.value, shipping);
          break;
        default:
          break;
      }
    }
  }

  const taxable = Math.max(subtotal - discount, 0);
  const tax = taxable * TAX_RATE;
  const total = taxable + tax + shipping - (promo === "FREESHIP" ? discount : 0);

  return {
    subtotal,
    discount,
    shipping: promo === "FREESHIP" ? Math.max(0, shipping - discount) : shipping,
    tax,
    total,
    appliedCode: promo && PROMO_CODES[promo] && subtotal >= PROMO_CODES[promo].minimum ? promo : null,
  };
}

function sanitizeCode(code = "") {
  return code.trim().toUpperCase();
}
