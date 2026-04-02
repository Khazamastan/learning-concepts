export function deepFilter(collection, predicate) {
  if (Array.isArray(collection)) {
    const filtered = collection
      .map((item) => deepFilter(item, predicate))
      .filter((item) => item !== undefined);
    return filtered.length > 0 ? filtered : undefined;
  }
  if (collection && typeof collection === 'object') {
    const entries = Object.entries(collection)
      .map(([key, value]) => {
        const filteredValue = deepFilter(value, predicate);
        if (filteredValue !== undefined) {
          return [key, filteredValue];
        }
        return null;
      })
      .filter(Boolean);
    if (entries.length === 0 && !predicate(collection)) {
      return undefined;
    }
    return Object.fromEntries(entries);
  }
  return predicate(collection) ? collection : undefined;
}
