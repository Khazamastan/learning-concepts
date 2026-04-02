module.exports = register => {
  register('schemaMigrations', () => {
    const steps = [];
    return {
      addStep: step => steps.push(step),
      plan: () => steps,
    };
  }, 'Analytics team sequencing safe migrations for a large Postgres cluster.');
};
