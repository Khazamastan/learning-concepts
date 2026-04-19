/**
 * Problem #28: Flatten a deeply nested object using dot notation
 *
 * Detailed Problem Statement:
 * Convert nested object into flat key paths like `a.b.c`.
 *
 * Example Input:
 * flattenObject({ a: { b: { c: 1 } }, d: 2 });
 *
 * Example Output:
 * { 'a.b.c': 1, d: 2 }
 */

export const problem = `Flatten a deeply nested object using dot notation`;

export const statement = `
Convert nested object into flat key paths like \`a.b.c\`.
`.trim();

export const exampleInput = `
flattenObject({ a: { b: { c: 1 } }, d: 2 });
`.trim();

export const exampleOutput = `
{ 'a.b.c': 1, d: 2 }
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function flattenObject(obj, parent = '', out = {}) {
  for (const key of Object.keys(obj)) {
    const path = parent ? `${parent}.${key}` : key;
    const value = obj[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, path, out);
    } else {
      out[path] = value;
    }
  }
  return out;
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
