# Currency formatting utility

## Problem

Format numeric values as localized currency strings using built-in APIs, while allowing callers to override currency, locale, and fraction digits.

## Solution

`formatCurrency` wraps `Intl.NumberFormat`, letting options fall back to USD/en-US with two decimals. The demo logs USD, EUR (Germany), and JPY formatting.

## Running locally

```bash
cd implement-a-currency-formatting-utility-javascript-interview-question
node src/index.js
```
