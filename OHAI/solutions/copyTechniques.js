'use strict';

/**
 * Demonstrates shallow and deep copy utilities.
 */
function shallowCopy(source) {
  if (source === null || typeof source !== 'object') {
    return source;
  }
  // Spread creates a shallow copy for plain objects and arrays.
  return Array.isArray(source) ? [...source] : { ...source };
}

function deepCopy(source, seen = new WeakMap()) {
  if (source === null || typeof source !== 'object') {
    return source;
  }
  if (seen.has(source)) {
    return seen.get(source);
  }
  const result = Array.isArray(source) ? [] : {};
  seen.set(source, result);

  for (const [key, value] of Object.entries(source)) {
    result[key] = deepCopy(value, seen);
  }
  return result;
}

const original = { a: 1, nested: { b: 2 }, items: [1, { c: 3 }] };
const shallow = shallowCopy(original);
const deep = deepCopy(original);

original.nested.b = 42;
original.items[1].c = 99;

console.log('Original:', original);
console.log('Shallow copy:', shallow); // nested references mutate
console.log('Deep copy:', deep); // insulated from nested mutations

module.exports = { shallowCopy, deepCopy };
