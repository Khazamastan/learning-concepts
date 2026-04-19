/**
 * Problem #24: Remove cycle from the object
 *
 * Detailed Problem Statement:
 * Given an object with circular references, return a deep copy where circular links are replaced with `"[Circular]"`.
 *
 * Example Input:
 * const a = { name: 'root' };
 * a.self = a;
 * console.log(JSON.stringify(removeCycle(a)));
 *
 * Example Output:
 * {"name":"root","self":"[Circular]"}
 */

export const problem = `Remove cycle from the object`;

export const statement = `
Given an object with circular references, return a deep copy where circular links are replaced with \`"[Circular]"\`.
`.trim();

export const exampleInput = `
const a = { name: 'root' };
a.self = a;
console.log(JSON.stringify(removeCycle(a)));
`.trim();

export const exampleOutput = `
{"name":"root","self":"[Circular]"}
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function removeCycle(obj) {
  const seen = new WeakMap();

  function helper(value) {
    if (value === null || typeof value !== 'object') return value;

    if (seen.has(value)) return '[Circular]';

    const out = Array.isArray(value) ? [] : {};
    seen.set(value, out);

    for (const key of Object.keys(value)) {
      out[key] = helper(value[key]);
    }
    return out;
  }

  return helper(obj);
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
