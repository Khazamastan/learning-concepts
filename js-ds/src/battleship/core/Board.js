class Board {
  constructor(size = 10) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array.from({ length: size }, () => null));
    this.ships = [];
    this.attacks = new Set();
  }

  static toKey(x, y) {
    return `${x}:${y}`;
  }

  inBounds(x, y) {
    return x >= 0 && x < this.size && y >= 0 && y < this.size;
  }

  canPlaceShip(ship, startX, startY, orientation) {
    const deltas = orientation === 'horizontal' ? [1, 0] : [0, 1];
    for (let i = 0; i < ship.length; i += 1) {
      const x = startX + deltas[0] * i;
      const y = startY + deltas[1] * i;
      if (!this.inBounds(x, y) || this.grid[y][x] !== null) {
        return false;
      }
    }
    return true;
  }

  placeShip(ship, startX, startY, orientation = 'horizontal') {
    if (!this.canPlaceShip(ship, startX, startY, orientation)) {
      throw new Error('Invalid ship placement');
    }
    const deltas = orientation === 'horizontal' ? [1, 0] : [0, 1];
    ship.orientation = orientation;
    ship.cells = [];
    for (let i = 0; i < ship.length; i += 1) {
      const x = startX + deltas[0] * i;
      const y = startY + deltas[1] * i;
      this.grid[y][x] = ship;
      ship.cells.push({ x, y });
    }
    this.ships.push(ship);
    return ship;
  }

  receiveAttack(x, y) {
    if (!this.inBounds(x, y)) {
      throw new Error('Attack coordinates out of bounds');
    }
    const key = Board.toKey(x, y);
    if (this.attacks.has(key)) {
      return { hit: false, alreadyTargeted: true };
    }
    this.attacks.add(key);
    const cellValue = this.grid[y][x];
    if (cellValue) {
      cellValue.hit();
      return { hit: true, ship: cellValue, sunk: cellValue.isSunk() };
    }
    return { hit: false };
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

module.exports = Board;
