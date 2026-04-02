# Implementing pagination in a frontend app

## Requirements to clarify

1. **Data source** – server-driven (API supports `page` / `limit`) vs. client-side (all data already loaded).
2. **Page size** – fixed, user-selectable, or adaptive?
3. **Navigation** – previous/next buttons, numbered page list, jump-to-page input.
4. **Accessibility** – focus management, ARIA labelling, keyboard support.
5. **Empty/loading states** – skeletons while fetching, messaging for no results.

## Server-driven pattern (recommended for large datasets)

```ts
// React example using fetch + URL search params
function usePaginatedQuery(params: { page: number; pageSize: number }) {
  const key = ['products', params.page, params.pageSize];
  return useQuery(key, async () => {
    const url = '/api/products?page=' + params.page + '&pageSize=' + params.pageSize;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load products');
    return res.json();
  }, { keepPreviousData: true });
}
```

Key considerations:

- Store `page` and `pageSize` in the URL (`/products?page=3`).
- Use query caching (`keepPreviousData`) to avoid jarring resets between pages.
- Render pagination controls based on `totalPages` returned by the API.

## Client-side pattern (small datasets)

```js
function paginate(array, page, pageSize) {
  const start = (page - 1) * pageSize;
  return array.slice(start, start + pageSize);
}
```

- Preload data once, then slice in memory.
- Keep the UI state identical to the server-driven approach so you can switch later without big refactors.

## UX checklist

- Disable prev/next at boundaries.
- Show range info (“21–40 of 128 results”).
- Make interactive controls buttons (not links) unless they trigger navigation.
- Support keyboard shortcuts (e.g., left/right arrows).
- Scroll to the top or focus the heading when page changes for screen-reader context.
