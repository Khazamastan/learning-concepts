const GameState = require('./core/GameState');
const Board = require('./core/Board');
const Ship = require('./core/Ship');
const { renderBoard, renderStatus } = require('./ui/Renderer');
const { bindControls } = require('./ui/Controls');
const { createAiStrategy } = require('./services/AiStrategy');
const { loadState, saveState, clearState } = require('./services/Persistence');
const MultiplayerService = require('./services/Multiplayer');
const { classicFleet } = require('./utils/shipPresets');
const logger = require('./utils/logger');

module.exports = {
  GameState,
  Board,
  Ship,
  renderBoard,
  renderStatus,
  bindControls,
  createAiStrategy,
  loadState,
  saveState,
  clearState,
  MultiplayerService,
  classicFleet,
  logger,
};
