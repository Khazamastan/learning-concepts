# Count Total Comments

Utility that counts nested comment threads recursively. Includes a React sandbox to paste JSON and view totals.

## API

```js
import { countComments } from "./countComments";

const total = countComments(comments);
```

`countComments` accepts either a single comment node (`{ id, replies: [] }`) or an array of nodes.

## Running the demo

```bash
cd count-total-comments
npm install
npm run dev
```

Open `http://localhost:5173`, edit the JSON, and click “Count comments” to recompute the total.
