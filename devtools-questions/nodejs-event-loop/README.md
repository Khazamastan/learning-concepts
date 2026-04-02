# Node.js event loop ordering

## Code

```js
function performNextTick() {
  process.nextTick(() => {
    console.log("Inside nextTick | outside setTimeout");
    setTimeout(() => {
      console.log("Inside nextTick | Inside setTimeout");
      process.exit(0);
    }, 0);
  });
}

setInterval(() => {
  console.log("setInterval");
}, 0);

performNextTick();
```

## Output

```
Inside nextTick | outside setTimeout
setInterval
... (several times)
Inside nextTick | Inside setTimeout
```

The `setInterval` line repeats until the `setTimeout` scheduled inside `nextTick` fires and calls `process.exit(0)`.

## Explanation

- `process.nextTick` callbacks run **before** the event loop continues to other phases, so the first line always prints immediately after scheduling.
- `setInterval` callbacks execute in the timers phase. They keep running on each tick because nothing cancels the interval.
- The `setTimeout` scheduled from within `nextTick` joins the timers queue and eventually fires, logging the final line and terminating the process.
