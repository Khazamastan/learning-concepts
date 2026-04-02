export function calculator(initialValue = 0) {
  let current = initialValue;
  const api = {
    add(value) {
      current += value;
      return api;
    },
    subtract(value) {
      current -= value;
      return api;
    },
    multiply(value) {
      current *= value;
      return api;
    },
    divide(value) {
      current /= value;
      return api;
    },
    value() {
      return current;
    },
    reset(value = 0) {
      current = value;
      return api;
    },
  };
  return api;
}

const total = calculator(10)
  .add(5)
  .subtract(3)
  .multiply(2)
  .divide(4)
  .value();

console.log("Result:", total);
