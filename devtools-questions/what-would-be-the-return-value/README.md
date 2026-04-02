# What would be the return value? (try/finally question)

```js
function init() {
  try {
    return 1;
  } finally {
    return 2;
  }
}

init(); // ?
```

## Explanation

JavaScript returns aren’t finalised until the surrounding `finally` block (if any) runs. When the `try` block executes `return 1`, the engine records a *completion record* containing the type (`return`) and the value (`1`). Control then flows to the `finally` block **before** the function actually returns. The `finally` block executes and itself issues `return 2`, generating a new completion record that overwrites the original one from the `try`.

Because the last completion record wins, the function resolves with `2`.

This behaviour is mandated by the ECMAScript specification (§13.15 *TryStatement* runtime semantics). `finally` always runs—whether the `try` block hits `return`, `throw`, or `break`. If the `finally` block produces a completion (return/throw), it replaces the prior completion.

## Key takeaways

- `finally` runs after `try`/`catch`, even when a `return` has already been encountered.
- A `return`, `throw`, or `break` inside `finally` overrides whatever happened in `try`/`catch`.
- Use `finally` for cleanup, not to produce alternate returns—overwriting returns can make code harder to reason about.
