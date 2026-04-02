export function curry(fn, arity = fn.length) {
  if (typeof fn !== "function") {
    throw new TypeError("curry expects a function");
  }

  function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    }
    return function (...rest) {
      return curried.apply(this, args.concat(rest));
    };
  }

  return curried;
}

function addThree(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(addThree);

console.log(curriedAdd(1)(2)(3));
console.log(curriedAdd(1, 2)(5));
console.log(curriedAdd(4, 5, 6));

const contextDemo = {
  value: 10,
  increment(x) {
    return this.value + x;
  },
};

const curriedIncrement = curry(contextDemo.increment, 1);
console.log(curriedIncrement.call(contextDemo, 5));
