const MOVES = [
  [1, 2],
  [2, 1],
  [-1, 2],
  [-2, 1],
  [1, -2],
  [2, -1],
  [-1, -2],
  [-2, -1],
];

export function findKnightPath(start, end, size = 8) {
  if (!start || !end) return [];
  const queue = [[start, [start]]];
  const visited = new Set([start.join(",")]);

  while (queue.length) {
    const [position, path] = queue.shift();
    if (position[0] === end[0] && position[1] === end[1]) {
      return path;
    }
    for (const [dx, dy] of MOVES) {
      const next = [position[0] + dx, position[1] + dy];
      if (isValid(next, size) && !visited.has(next.join(","))) {
        visited.add(next.join(","));
        queue.push([next, [...path, next]]);
      }
    }
  }
  return [];
}

function isValid([x, y], size) {
  return x >= 0 && y >= 0 && x < size && y < size;
}
