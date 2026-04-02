export function getElementsByTagName(node, tagName) {
  const results = [];
  const normalized = String(tagName).toLowerCase();

  function traverse(current) {
    if (!current) return;
    if ((current.tagName ?? '').toLowerCase() === normalized) {
      results.push(current);
    }
    (current.children ?? []).forEach(traverse);
  }

  traverse(node);
  return results;
}
