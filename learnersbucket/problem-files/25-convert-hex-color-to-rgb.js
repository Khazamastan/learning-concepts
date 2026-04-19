/**
 * Problem #25: Convert HEX color to RGB
 *
 * Detailed Problem Statement:
 * Convert `#RRGGBB` or `#RGB` into `rgb(r, g, b)` format.
 *
 * Example Input:
 * hexToRgb('#03A9F4');
 * hexToRgb('#0AF');
 *
 * Example Output:
 * rgb(3, 169, 244)
 * rgb(0, 170, 255)
 */

export const problem = `Convert HEX color to RGB`;

export const statement = `
Convert \`#RRGGBB\` or \`#RGB\` into \`rgb(r, g, b)\` format.
`.trim();

export const exampleInput = `
hexToRgb('#03A9F4');
hexToRgb('#0AF');
`.trim();

export const exampleOutput = `
rgb(3, 169, 244)
rgb(0, 170, 255)
`.trim();

// ---------------------------
// Approach 1: Reference Solution
// ---------------------------
function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const num = Number.parseInt(h, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgb(${r}, ${g}, ${b})`;
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
