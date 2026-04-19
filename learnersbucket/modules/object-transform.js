/**
 * Problem: Remove cycle from object.
 * Example Input:
 *   const a = { name: 'root' }; a.self = a; removeCycle(a)
 * Example Output:
 *   { name: 'root', self: '[Circular]' }
 */
export function removeCycle(obj) {
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

/**
 * Problem: Convert HEX color to RGB.
 * Example Input:
 *   hexToRgb('#03A9F4'), hexToRgb('#0AF')
 * Example Output:
 *   'rgb(3, 169, 244)', 'rgb(0, 170, 255)'
 */
export function hexToRgb(hex) {
  let h = hex.replace('#', '').trim();
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const num = Number.parseInt(h, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Problem: Get object value from string path.
 * Example Input:
 *   getByPath({a:{b:[{c:42}]}}, 'a.b[0].c')
 * Example Output:
 *   42
 */
export function getByPath(obj, path, defaultValue) {
  const parts = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean);
  let curr = obj;

  for (const key of parts) {
    if (curr == null || !(key in curr)) return defaultValue;
    curr = curr[key];
  }

  return curr;
}

/**
 * Problem: Filter nested object by predicate.
 * Example Input:
 *   filterNestedObject(data, v => typeof v === 'number' && v < 5)
 * Example Output:
 *   filtered nested object without empty branches
 */
export function filterNestedObject(obj, predicate) {
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

/**
 * Problem: Flatten a deeply nested object using dot notation.
 * Example Input:
 *   flattenObjectDot({a:{b:{c:1}}, d:2})
 * Example Output:
 *   { 'a.b.c': 1, d: 2 }
 */
export function flattenObjectDot(obj, parent = '', out = {}) {
  for (const key of Object.keys(obj)) {
    const path = parent ? `${parent}.${key}` : key;
    const value = obj[key];

    if (value && typeof value === 'object' && !Array.isArray(value)) {
      flattenObjectDot(value, path, out);
    } else {
      out[path] = value;
    }
  }

  return out;
}
