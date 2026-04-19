/**
 * Problem #27: Filter nested object
 *
 * Detailed Problem Statement:
 * Given a nested object and predicate, keep only key-value pairs that satisfy predicate. Empty objects should be removed.
 *
 * Example Input:
 * const data = {
 *   a: 1,
 *   b: { c: 2, d: 9 },
 *   e: { f: 3 }
 * };
 * filterNestedObject(data, (v) => typeof v === 'number' && v < 5);
 *
 * Example Output:
 * { a: 1, b: { c: 2 }, e: { f: 3 } }
 */

export const problem = `Filter nested object`;

export const statement = `
Given a nested object and predicate, keep only key-value pairs that satisfy predicate. Empty objects should be removed.
`.trim();

export const exampleInput = `
const data = {
  a: 1,
  b: { c: 2, d: 9 },
  e: { f: 3 }
};
filterNestedObject(data, (v) => typeof v === 'number' && v < 5);
`.trim();

export const exampleOutput = `
{ a: 1, b: { c: 2 }, e: { f: 3 } }
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function filterNestedObject(obj, predicate) {
  if (obj === null || typeof obj !== 'object') {
    return predicate(obj) ? obj : undefined;
  }

  const out = Array.isArray(obj) ? [] : {};

  for (const key of Object.keys(obj)) {
    const filtered = filterNestedObject(obj[key], predicate);
    if (filtered !== undefined) {
      if (Array.isArray(out)) out.push(filtered);
      else out[key] = filtered;
    }
  }

  if (Array.isArray(out)) return out.length ? out : undefined;
  return Object.keys(out).length ? out : undefined;
}

// ---------------------------
// Approach 2: Recursive traversal
// ---------------------------
function recursiveTransform(node) {
  if (node === null || typeof node !== 'object') return node;
  const out = Array.isArray(node) ? [] : {};
  for (const key of Object.keys(node)) {
    out[key] = recursiveTransform(node[key]);
  }
  return out;
}

// ---------------------------
// Approach 3: Iterative stack traversal
// ---------------------------
function iterativeTransform(root) {
  if (root === null || typeof root !== 'object') return root;
  const out = Array.isArray(root) ? [] : {};
  const stack = [{ src: root, dst: out }];

  while (stack.length) {
    const { src, dst } = stack.pop();
    for (const key of Object.keys(src)) {
      const value = src[key];
      if (value && typeof value === 'object') {
        dst[key] = Array.isArray(value) ? [] : {};
        stack.push({ src: value, dst: dst[key] });
      } else {
        dst[key] = value;
      }
    }
  }

  return out;
}
