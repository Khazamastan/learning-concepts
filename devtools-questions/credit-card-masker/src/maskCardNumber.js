/**
 * Mask a credit card number, keeping the last four digits visible.
 * @param {string | number} cardNumber
 * @returns {string}
 */
export function maskCardNumber(cardNumber) {
  const digits = String(cardNumber).replace(/\D/g, '');
  if (digits.length <= 4) {
    return digits;
  }
  const visible = digits.slice(-4);
  const masked = digits
    .slice(0, -4)
    .replace(/\d/g, '*')
    .replace(/(.{4})/g, '$1 ')
    .trim();
  return `${masked} ${visible}`.trim();
}
