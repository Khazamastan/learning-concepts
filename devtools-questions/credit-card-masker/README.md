# Credit Card Masker

## Problem
Display a credit card number safely by hiding all but the last four digits.
Formatting should tolerate spaces or other separators in the input.

## Solution
The `maskCardNumber` helper strips non-digits, returns early when the card is
shorter than five digits, and replaces the leading numbers with `*`. A small
regex inserts spaces every four characters for readability before appending the
visible tail.

## Running locally
```
npm install
npm start
```
