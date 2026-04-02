module.exports = register => {
  register('queues', () => {
    const queue = [];
    return {
      enqueue: item => queue.push(item),
      dequeue: () => queue.shift() || null,
      size: () => queue.length,
    };
  }, 'Background job queue smoothing bursty image processing tasks.');
};
