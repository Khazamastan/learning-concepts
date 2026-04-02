const logger = {
  info: (...args) => {
    if (process.env.NODE_ENV !== 'test') {
      console.info('[Battleship]', ...args);
    }
  },
  error: (...args) => {
    console.error('[Battleship]', ...args);
  },
};

module.exports = logger;
