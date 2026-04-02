export function createIncrement(start = 0) {
  let value = start;
  return function increment(step = 1) {
    value += step;
    return value;
  };
}

const inc = createIncrement(5);
console.log(inc());
console.log(inc(2));
console.log(inc());
