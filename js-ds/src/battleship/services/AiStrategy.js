const getRandomCoordinate = (size) => ({
  x: Math.floor(Math.random() * size),
  y: Math.floor(Math.random() * size),
});

const createAiStrategy = ({ difficulty = 'easy' } = {}) => {
  const memory = new Set();
  const nextMoves = [];

  const selectHardTarget = (board) => {
    if (nextMoves.length > 0) {
      return nextMoves.shift();
    }
    let coordinate;
    do {
      coordinate = getRandomCoordinate(board.size);
    } while (memory.has(`${coordinate.x}:${coordinate.y}`));
    return coordinate;
  };

  return {
    nextShot(board) {
      const pick = difficulty === 'hard' ? selectHardTarget(board) : getRandomCoordinate(board.size);
      const key = `${pick.x}:${pick.y}`;
      memory.add(key);
      const result = board.attacks.has(key) ? { alreadyTargeted: true } : board.receiveAttack(pick.x, pick.y);
      if (result.hit && !result.sunk) {
        const candidates = [
          { x: pick.x + 1, y: pick.y },
          { x: pick.x - 1, y: pick.y },
          { x: pick.x, y: pick.y + 1 },
          { x: pick.x, y: pick.y - 1 },
        ];
        candidates
          .filter(({ x, y }) => x >= 0 && y >= 0 && x < board.size && y < board.size)
          .forEach((candidate) => {
            const candidateKey = `${candidate.x}:${candidate.y}`;
            if (!memory.has(candidateKey)) {
              nextMoves.push(candidate);
            }
          });
      }
      return { pick, result };
    },
  };
};

module.exports = { createAiStrategy };
