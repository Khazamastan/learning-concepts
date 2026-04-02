# `groupBy` polyfill

## Implementation

```js
function groupBy(collection, iteratee) {
  const keyGetter = typeof iteratee === "function"
    ? iteratee
    : (item) => item[iteratee];

  return collection.reduce((acc, item, index) => {
    const key = keyGetter(item, index, collection);
    const bucket = acc[key] || (acc[key] = []);
    bucket.push(item);
    return acc;
  }, {});
}
```

## Usage

```js
const data = [
  { category: "fruit", name: "apple" },
  { category: "vegetable", name: "carrot" },
  { category: "fruit", name: "banana" },
  { category: "vegetable", name: "kale" },
];

console.log(groupBy(data, "category"));
// { fruit: [{...}, {...}], vegetable: [{...}, {...}] }

console.log(groupBy([6.1, 4.2, 6.3], Math.floor));
// { 4: [4.2], 6: [6.1, 6.3] }
```

## Explanation

- Supports both property-name iteratees and custom iterator functions, matching Lodash behaviour.
- Reuses the accumulator buckets to avoid repeated allocations.
- The reducer passes the current index and the whole collection to the iteratee to maintain parity with Lodash’s signature.
