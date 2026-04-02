export function formatCurrency(value, { currency = 'USD', locale = 'en-US', minimumFractionDigits = 2 } = {}) {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
  });
  return formatter.format(value);
}

console.log(formatCurrency(1299.99));
console.log(formatCurrency(1299.99, { currency: 'EUR', locale: 'de-DE' }));
console.log(formatCurrency(5000, { currency: 'JPY', locale: 'ja-JP', minimumFractionDigits: 0 }));
