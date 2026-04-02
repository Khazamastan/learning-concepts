# Group Array by Key

Utility to group objects by a property or custom selector.

## API

```js
import { groupBy } from "./groupBy";

groupBy(users, "role");
groupBy(users, (user) => user.country);
```

## Run example

```bash
cd group-array-by-key
npm install
npm start
```

Outputs grouped collections in the console.
