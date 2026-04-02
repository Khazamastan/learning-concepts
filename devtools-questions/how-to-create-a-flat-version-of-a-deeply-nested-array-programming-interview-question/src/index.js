export function flatten(input) {
  const result = [];
  const stack = [...input.map((item) => ({ item, depth: 0 }))];
  while (stack.length) {
    const { item } = stack.pop();
    if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i -= 1) {
        stack.push({ item: item[i] });
      }
    } else {
      result.push(item);
    }
  }
  return result.reverse();
}

const nested = [1, [2, [3, 4], 5], [[6]], 7];
console.log(flatten(nested));
