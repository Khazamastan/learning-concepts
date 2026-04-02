# `defer` vs `async`

This question is about when two script loading attributes fire relative to HTML parsing.

## Key rules

- `defer` scripts download in parallel with HTML parsing **but run in document order** after parsing has completed, right before `DOMContentLoaded`.
- `async` scripts also download while the parser keeps going, **but execute as soon as they finish downloading**, regardless of document order. Each async script pauses parsing momentarily when it executes.
- Deferred scripts wait for each other and respect dependencies; async scripts should be independent because execution order is not guaranteed.

## Minimal demo

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Defer vs Async</title>
    <script defer src="deferred.js"></script>
    <script async src="async-a.js"></script>
    <script async src="async-b.js"></script>
  </head>
  <body>
    <script>
      console.log("inline script runs while downloads happen");
    </script>
  </body>
</html>
```

If the network is slow, you can observe this timeline in dev tools:

1. The inline `<script>` runs as soon as the parser reaches it.
2. `async-a.js` and `async-b.js` log whenever each download completes (order may flip between refreshes).
3. `deferred.js` always executes last of the trio, keeping DOM order guarantees regardless of download speed.
