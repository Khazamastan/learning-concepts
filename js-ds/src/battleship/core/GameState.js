const Board = require('./Board');
const Ship = require('./Ship');

class GameState {
  constructor({ players = ['Player 1', 'Player 2'], boardSize = 10, shipLayouts = [] } = {}) {
    this.players = players;
    this.activePlayerIndex = 0;
    this.boards = players.map(() => new Board(boardSize));
    this.shipLayouts = shipLayouts;
    this.eventListeners = new Map();
  }

  get activePlayer() {
    return this.players[this.activePlayerIndex];
  }

  get opponentIndex() {
    return (this.activePlayerIndex + 1) % this.players.length;
  }

  on(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }
    this.eventListeners.get(event).add(callback);
    return () => this.eventListeners.get(event).delete(callback);
  }

  emit(event, payload) {
    const listeners = this.eventListeners.get(event);
    if (!listeners) {
      return;
    }
    listeners.forEach((listener) => listener(payload));
  }

  setupBoards() {
    this.boards.forEach((board, index) => {
      const layout = this.shipLayouts[index] || [];
      layout.forEach(({ type, length, startX, startY, orientation }) => {
        const ship = new Ship({ type, length });
        board.placeShip(ship, startX, startY, orientation);
      });
    });
  }

  takeTurn(x, y) {
    const defenderBoard = this.boards[this.opponentIndex];
    const result = defenderBoard.receiveAttack(x, y);
    this.emit('attack', { attacker: this.activePlayer, target: this.players[this.opponentIndex], x, y, result });
    if (result.sunk) {
      this.emit('shipSunk', { ship: result.ship, defender: this.players[this.opponentIndex] });
    }
    if (defenderBoard.allShipsSunk()) {
      this.emit('gameOver', { winner: this.activePlayer });
    } else if (!result.hit) {
      this.endTurn();
    }
    return result;
  }

  endTurn() {
    this.activePlayerIndex = this.opponentIndex;
    this.emit('turnChanged', { activePlayer: this.activePlayer });
  }
}

module.exports = GameState;
