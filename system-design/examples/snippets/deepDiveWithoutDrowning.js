module.exports = register => {
  register('deepDiveWithoutDrowning', () => {
    const guardrails = [
      'Outline major components before zooming in',
      'Set a timer for detailed sections',
      'Tie each deep dive back to the high-level goal',
    ];
    return { guardrails };
  }, 'Maintain structure while examining complex subsystems under time pressure.');
};
