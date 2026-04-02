/**
 * composeAsync(fns...) creates a function that runs the provided asynchronous
 * functions right-to-left, passing the resolved value of each into the previous one.
 *
 * If any function throws or rejects, the composed function rejects immediately.
 */
export function composeAsync(...fns) {
  if (fns.length === 0) {
    throw new Error("composeAsync requires at least one function");
  }

  if (!fns.every((fn) => typeof fn === "function")) {
    throw new TypeError("composeAsync expects functions");
  }

  return function composed(input) {
    return fns.reduceRight(
      (chain, fn) => chain.then((value) => Promise.resolve(fn(value))),
      Promise.resolve(input),
    );
  };
}

/**
 * pipeAsync(fns...) runs left-to-right composition, which is often easier to follow.
 */
export function pipeAsync(...fns) {
  return composeAsync(...fns.reverse());
}
