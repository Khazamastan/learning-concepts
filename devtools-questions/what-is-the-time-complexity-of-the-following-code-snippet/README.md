# Time complexity discussion

## Code

```js
function findIntersection(first, second) {
  const firstSet = new Set(first);

  return second.reduce((acc, current) => {
    return firstSet.has(current) ? [...acc, current] : acc;
  }, []);
}

function init() {
  const first = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const second = [1, 2, 3, 4, 5];
  console.log(findIntersection(first, second));
}

init();
```

## Output

```
[ 1, 2, 3, 4, 5 ]
```

## Explanation

- The `reduce` callback spreads the accumulator on every hit (`[...acc, current]`), which costs `O(k)` for a result of length `k`. Because this happens for each element in `second`, the overall time complexity is `O(n^2)` in the worst case.
- The snippet works functionally, but a better approach would push into the accumulator (`acc.push(current)`) to keep the runtime linear.
