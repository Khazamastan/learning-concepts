export function buildBreadcrumbChain(nodes, currentId) {
  if (!Array.isArray(nodes)) {
    throw new TypeError("nodes must be an array");
  }
  const byId = new Map(nodes.map((node) => [node.id, node]));
  if (!byId.has(currentId)) {
    throw new Error(`Unknown node id: ${currentId}`);
  }

  const chain = [];
  const seen = new Set();
  let cursor = byId.get(currentId);

  while (cursor) {
    if (seen.has(cursor.id)) {
      throw new Error(`Cycle detected at ${cursor.id}`);
    }
    seen.add(cursor.id);
    chain.unshift({ id: cursor.id, label: cursor.label });
    if (!cursor.parentId) break;
    cursor = byId.get(cursor.parentId);
    if (!cursor) {
      throw new Error(`Missing parent: ${chain[0].id} references ${chain[0].parentId}`);
    }
  }

  return chain;
}
