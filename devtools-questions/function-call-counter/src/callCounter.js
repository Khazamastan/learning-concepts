export function createCallCounter(fn, { label = fn.name || "anonymous" } = {}) {
  if (typeof fn !== "function") {
    throw new TypeError("createCallCounter expects a function");
  }

  let count = 0;

  function wrapped(...args) {
    count += 1;
    return fn.apply(this, args);
  }

  wrapped.reset = () => {
    count = 0;
  };

  wrapped.getCount = () => count;
  wrapped.getLabel = () => label;

  return wrapped;
}

export function createCounterMap(functions) {
  return functions.map((entry) => ({
    label: entry.label,
    fn: createCallCounter(entry.fn, { label: entry.label }),
  }));
}
