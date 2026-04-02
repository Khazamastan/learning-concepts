# Event loop ordering with `setTimeout`

## Code

```js
console.log("start");

setTimeout(() => {
  console.log("timer A");
  Promise.resolve().then(() => console.log("microtask inside timer"));
}, 0);

setTimeout(() => {
  console.log("timer B");
}, 0);

Promise.resolve().then(() => console.log("microtask outside"));

console.log("end");
```

## Output

```
start
end
microtask outside
timer A
microtask inside timer
timer B
```

## Explanation

- Synchronous work runs first, so `start` and `end` print immediately around the scheduling code.
- Promise callbacks are microtasks; they run before the runtime returns to the timers queue. The “outside” microtask fires next.
- Both timers become eligible on the next timers phase and run in registration order. `timer A` executes first, queues another microtask, and the runtime drains that microtask before running `timer B`.
