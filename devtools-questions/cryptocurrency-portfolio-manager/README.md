# Cryptocurrency Portfolio Manager

## Problem
Build a mock dashboard that lets users track a handful of cryptocurrency
holdings. The app should combine static market data with editable positions to
display current value, 24-hour change, and per-asset controls for adjusting or
removing entries. Adding a holding should merge with an existing position when
the ticker matches.

## Solution
This React + Vite interface stores holdings in component state and derives the
rest from memoised selectors. A `portfolio` memo enriches each position with
price, computed value, and daily delta based on the static `MARKET` table,
while a `totals` memo aggregates portfolio value and 24-hour movement for the
summary header. The add-form validates numeric input before either incrementing
an existing position or appending a new one. Inline number inputs update
amounts via controlled state, and a `Remove` action filters the holding out of
the array. Formatting helpers keep the monetary display tidy without extra
libraries.

## Running locally
```
npm install
npm run dev
```
