class Ship {
  constructor({ type, length }) {
    this.type = type;
    this.length = length;
    this.hits = 0;
    this.cells = [];
    this.orientation = 'horizontal';
  }

  hit() {
    this.hits = Math.min(this.hits + 1, this.length);
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

module.exports = Ship;
