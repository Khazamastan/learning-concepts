# Ecommerce Product Listing Page

## Problem

Design a responsive ecommerce catalogue page with:

- Hero copy + search bar.
- Category and tag filters.
- Sorting controls (price/rating).
- Product cards showing image, price, rating, and tags.
- Empty state messaging when filters exclude all items.

## Solution

This Vite + React build keeps an in-memory catalogue (`PRODUCTS`). The `ProductPage` component tracks search text, active category, selected tags, and sort option. Derived product lists are memoised for performance. Layout uses CSS Grid with a sticky filter column on desktop and a dark, glassmorphism-inspired aesthetic.

Key behaviours:

- Search matches product names and tags.
- Tag pills toggle inclusion; all selected tags must match.
- Sorting handles price ascending/descending and rating.
- Accessibility improvements include live region updates, `sr-only` labels, and focus-visible styling.

## Running locally

```bash
cd build-an-ecommerce-product-listing-page-using-reactjs-frontend-coding-challenge-advanced-javascript
npm install
npm run dev
```

Open the provided Vite URL (default `http://localhost:5173`) to interact with the catalogue.
