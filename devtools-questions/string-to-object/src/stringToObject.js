/**
 * Convert a dotted string representation (key=value) into a nested object.
 * Supports multiple lines or '&' separated declarations.
 * @param {string} input
 * @returns {Record<string, any>}
 */
export function stringToObject(input) {
  const lines = input
    .split(/\n|&|;/)
    .map((line) => line.trim())
    .filter(Boolean);

  return lines.reduce((acc, line) => {
    const [path, rawValue] = line.split('=').map((part) => part.trim());
    if (!path) return acc;
    const value = parseValue(rawValue);
    setByPath(acc, path.split('.'), value);
    return acc;
  }, {});
}

function parseValue(raw) {
  if (raw === undefined) return null;
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  const numeric = Number(raw);
  if (!Number.isNaN(numeric)) {
    return numeric;
  }
  return raw;
}

function setByPath(target, path, value) {
  let ref = target;
  const lastIndex = path.length - 1;
  path.forEach((segment, index) => {
    if (index === lastIndex) {
      ref[segment] = value;
    } else {
      ref[segment] = ref[segment] ?? {};
      ref = ref[segment];
    }
  });
}
