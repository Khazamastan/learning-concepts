export async function measure(fn, args = [], { label, async = false } = {}) {
  if (typeof fn !== "function") {
    throw new TypeError("measure expects a function");
  }

  const start = performance.now();
  let result;
  if (async) {
    result = await fn(...args);
  } else {
    result = fn(...args);
  }
  const end = performance.now();

  return {
    label: label ?? fn.name ?? "anonymous",
    duration: end - start,
    result,
  };
}

export async function measureMultiple(samples) {
  const runs = [];
  for (const sample of samples) {
    const { fn, args = [], options = {} } = sample;
    runs.push(await measure(fn, args, options));
  }
  return runs;
}
