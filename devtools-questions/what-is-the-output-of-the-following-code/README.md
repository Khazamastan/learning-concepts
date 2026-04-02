# Async/await scheduling

## Code

```js
let num = 0;

async function increment() {
  num += await 2;
  console.log(num);
}

increment();
num += 1;

console.log(num);
```

## Output

```
1
2
```

## Explanation

- The call to `increment()` reaches `await 2`, yielding control back to the event loop. The expression after `await` resolves on the next microtask.
- Meanwhile the synchronous code continues, so `num += 1` runs and the first `console.log` prints `1`.
- Once the microtask resumes, `await 2` resolves to `2`. The pending addition uses the original `num` (still `1` at that point), so the function logs `2`.
