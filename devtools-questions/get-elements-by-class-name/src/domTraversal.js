export function getElementsByClassName(node, className) {
  const results = [];
  const normalized = String(className);

  function traverse(current) {
    if (!current) return;
    const classes = new Set((current.className ?? '').split(/\s+/).filter(Boolean));
    if (classes.has(normalized)) {
      results.push(current);
    }
    (current.children ?? []).forEach(traverse);
  }

  traverse(node);
  return results;
}
