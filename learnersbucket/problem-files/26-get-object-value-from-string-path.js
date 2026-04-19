/**
 * Problem #26: Get object value from string path
 *
 * Detailed Problem Statement:
 * Implement `get(obj, path, defaultValue)` where path can be like `"a.b[0].c"`.
 *
 * Example Input:
 * const obj = { a: { b: [{ c: 42 }] } };
 * get(obj, 'a.b[0].c');
 * get(obj, 'a.x.y', 'NA');
 *
 * Example Output:
 * 42
 * NA
 */

export const problem = `Get object value from string path`;

export const statement = `
Implement \`get(obj, path, defaultValue)\` where path can be like \`"a.b[0].c"\`.
`.trim();

export const exampleInput = `
const obj = { a: { b: [{ c: 42 }] } };
get(obj, 'a.b[0].c');
get(obj, 'a.x.y', 'NA');
`.trim();

export const exampleOutput = `
42
NA
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function get(obj, path, defaultValue) {
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
  let curr = obj;
  for (const key of parts) {
    if (curr == null || !(key in curr)) return defaultValue;
    curr = curr[key];
  }
  return curr;
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
