# Timers with different delays

## Code

```js
console.log("a");

setTimeout(() => {
  console.log("b");
}, 1);

setTimeout(() => {
  console.log("c");
}, 10);

setTimeout(() => {
  console.log("d");
}, 0);

console.log("e");
```

## Output

```
a
e
b
d
c
```

## Explanation

- The synchronous logs run first, so we see `a` and `e` immediately.
- Timers queued with small delays become eligible on the next pass through the timers phase. Both the `1` ms and `0` ms timers are ready together; Node executes callbacks in registration order, so `b` precedes `d`.
- The `10` ms timer is not yet ready, so it fires later, producing `c`.
