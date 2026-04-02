# Implement `listenTo`

`listenTo` is a tiny, dependency-free event delegation helper that mirrors the ergonomics of jQuery’s `.on`. It attaches a single listener to a parent element, optionally filters targets with a CSS selector, and returns a cleanup function.

## API

```js
listenTo(parent, "click", handler);
listenTo(parent, "click", ".child-selector", handler, options);
```

- `parent`: DOM element that receives the original listener.
- `type`: event name (string).
- `selector`: optional CSS selector; if provided, the handler fires when `event.target.closest(selector)` matches within the parent.
- `handler`: callback invoked with `this` bound to the matching element.
- `options`: optional listener options (capture, once, passive).

Returns a function that removes the listener, ideal for React effects or vanilla JS modules.

## Demo

The React playground shows delegated listeners on a kanban column. Click cards to log activity or press Delete to remove them — no per-card listeners needed.

## Project layout

```
implement-listen-to/
├── index.html
├── package.json
├── src/
│   ├── ListenToDemo.jsx
│   ├── index.jsx
│   ├── listenTo.js
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd implement-listen-to
npm install
npm run dev
```

Visit `http://localhost:5173` to interact with the demo.

## Implementation details

- Validates arguments and supports both direct handler and delegated selector signatures.
- Uses `Element.closest` to bubble up through hit targets.
- Stores listener reference closure to enable clean unsubscription.
- Works seamlessly in React’s `useEffect` or plain scripts.
