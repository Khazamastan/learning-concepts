export function camelCaseKeys(input) {
  if (Array.isArray(input)) {
    return input.map(camelCaseKeys);
  }
  if (input && typeof input === 'object') {
    return Object.entries(input).reduce((acc, [key, value]) => {
      acc[toCamelCase(key)] = camelCaseKeys(value);
      return acc;
    }, {});
  }
  return input;
}

function toCamelCase(value) {
  return value
    .split(/[_-\s]+/)
    .map((segment, index) => {
      const lower = segment.toLowerCase();
      if (index === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}
