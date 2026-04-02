export function indexOf(array, searchElement, fromIndex = 0) {
  if (array == null) {
    throw new TypeError("indexOf called on null or undefined");
  }
  const length = Number(array.length) || 0;
  if (length === 0) return -1;

  let start = Number(fromIndex) || 0;
  if (start < 0) {
    start = Math.max(length + start, 0);
  }

  for (let i = start; i < length; i += 1) {
    if (i in array && array[i] === searchElement) {
      return i;
    }
  }
  return -1;
}

const demo = ["a", "b", "c", "b"];
console.log(indexOf(demo, "b"));
console.log(indexOf(demo, "b", 2));
console.log(indexOf(demo, "z"));
console.log(indexOf({ 0: "x", 2: "y", length: 3 }, "y"));
