# Event loop tracing

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

1. **Synchronous phase** – `a` logs before any timers are registered; `e` logs immediately after the `setTimeout` calls.
2. **Timers phase (tick 1)** – both the `1` ms and `0` ms callbacks are ready on the next loop iteration. The event loop services timers in insertion order, so `b` is printed before `d`.
3. **Timers phase (tick 2)** – the `10` ms timer ripens later and prints `c` on a subsequent iteration.

This ordering matches the behaviour noted in Steve Griffith’s event-loop demos.
