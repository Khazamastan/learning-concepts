export function groupBy(array, keyOrFn) {
  if (!Array.isArray(array)) {
    throw new TypeError("First argument must be an array");
  }
  const getKey = typeof keyOrFn === "function" ? keyOrFn : (item) => item[keyOrFn];
  return array.reduce((acc, item) => {
    const key = getKey(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}
