# Object without a prototype

## Problem

Create a plain dictionary-like object that does **not** inherit from `Object.prototype`. This is handy when you need to store arbitrary keys (including `__proto__`) without collision or when you want full control over the available properties.

## Solution

`Object.create(null)` builds an object whose internal prototype is `null`. The helper `createRecord(pairs)` accepts `[key, value]` tuples, populates the new map, and returns it. Because the object has no prototype, even keys such as `constructor` or `toString` behave like ordinary data slots.

Key points:

- The resulting object has `Object.getPrototypeOf(obj) === null`.
- No inherited methods (`toString`, `hasOwnProperty`, etc.). Use the prototypes manually if you need them.
- Works well for serialisation to JSON and for guards against prototype pollution.

## Running locally

```bash
cd how-to-create-an-object-without-prototype-javascript-interview-question-beginner
node src/index.js
```

The demo prints the dictionary, confirms the missing prototype, and shows how to fall back to `Object.prototype.hasOwnProperty.call` when necessary.
