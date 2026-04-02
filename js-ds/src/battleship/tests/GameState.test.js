const GameState = require('../core/GameState');

describe('GameState', () => {
  it('initializes boards for all players', () => {
    const game = new GameState({ players: ['A', 'B'], boardSize: 10 });
    expect(game.boards).toHaveLength(2);
    expect(game.boards[0].size).toBe(10);
  });

  it('marks defender ship as hit during an attack', () => {
    const game = new GameState({
      players: ['A', 'B'],
      shipLayouts: [
        [],
        [{ type: 'Destroyer', length: 2, startX: 0, startY: 0, orientation: 'horizontal' }],
      ],
    });

    game.setupBoards();
    const result = game.takeTurn(0, 0);
    expect(result.hit).toBe(true);
  });
});
