# Event-Driven Key-Value Store

Lightweight store that exposes `get`, `set`, `delete`, and event subscriptions (`on('*')`, `on('key')`). Similar in spirit to a minimal Flux store.

## API

```js
import { KeyValueStore } from "./KeyValueStore";

const store = new KeyValueStore({ theme: "light" });
const unsubscribe = store.on("*", ({ key, value }) => console.log(key, value));

store.set("theme", "dark");
store.delete("theme");
unsubscribe();
```

## Demo

`src/StoreDemo.jsx` renders an interactive UI to add/update/delete keys while streaming change events.

## Run locally

```bash
cd event-driven-key-value-store
npm install
npm run dev
```

Open `http://localhost:5173`.
