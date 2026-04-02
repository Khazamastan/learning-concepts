const toKey = (x, y) => `${x}:${y}`;

const fromKey = (key) => {
  const [x, y] = key.split(':').map(Number);
  return { x, y };
};

const isAdjacent = (a, b) => {
  const dx = Math.abs(a.x - b.x);
  const dy = Math.abs(a.y - b.y);
  return dx + dy === 1;
};

module.exports = { toKey, fromKey, isAdjacent };
