export function validateStructure(records) {
  const issues = [];

  if (!Array.isArray(records)) {
    issues.push({
      level: "error",
      message: "Input must be a JSON array of employee objects.",
    });
    return issues;
  }

  const byId = new Map();
  const managerChildren = new Map();
  const titleSet = new Map();

  for (const [index, record] of records.entries()) {
    if (typeof record !== "object" || record === null) {
      issues.push({
        level: "error",
        message: `Record at index ${index} is not an object.`,
      });
      continue;
    }

    const { id, name, managerId, title } = record;

    if (!id || typeof id !== "string") {
      issues.push({ level: "error", message: `Employee at index ${index} requires a string id.` });
      continue;
    }

    if (byId.has(id)) {
      issues.push({ level: "error", message: `Duplicate id detected: ${id}. Ids must be unique.` });
      continue;
    }
    byId.set(id, record);

    if (!name) {
      issues.push({ level: "warning", message: `Employee ${id} is missing a name.` });
    }

    if (title) {
      const lowerTitle = title.toLowerCase();
      titleSet.set(lowerTitle, (titleSet.get(lowerTitle) ?? 0) + 1);
    }

    if (managerId) {
      managerChildren.set(managerId, [...(managerChildren.get(managerId) ?? []), id]);
    }
  }

  // Manager references must exist
  for (const record of records) {
    if (!record || typeof record !== "object") continue;
    const { id, managerId } = record;
    if (managerId && !byId.has(managerId)) {
      issues.push({
        level: "error",
        message: `Employee ${id} references missing manager ${managerId}.`,
      });
    }
  }

  // Prevent cycles using DFS
  const visiting = new Set();
  const visited = new Set();

  const detectCycle = (id, path = []) => {
    if (visiting.has(id)) {
      issues.push({
        level: "error",
        message: `Cycle detected: ${[...path, id].join(" → ")}.`,
      });
      return;
    }
    if (visited.has(id)) return;

    visiting.add(id);
    const record = byId.get(id);
    if (record && record.managerId) {
      detectCycle(record.managerId, [...path, id]);
    }
    visiting.delete(id);
    visited.add(id);
  };

  for (const id of byId.keys()) {
    detectCycle(id);
  }

  // Check direct reports count
  for (const [managerId, reports] of managerChildren.entries()) {
    if (reports.length > 8) {
      issues.push({
        level: "warning",
        message: `Manager ${managerId} has ${reports.length} direct reports. Consider flattening.`,
      });
    }
  }

  // Highlight duplicate titles
  for (const [title, count] of titleSet.entries()) {
    if (count > 5) {
      issues.push({
        level: "info",
        message: `Title "${title}" appears ${count} times. Review role differentiation.`,
      });
    }
  }

  if (!records.some((record) => record && !record.managerId)) {
    issues.push({
      level: "warning",
      message: "Structure lacks a root-level executive (no one without a manager).",
    });
  }

  return issues;
}
