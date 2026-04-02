module.exports = register => {
  register('zeroDowntimeDeploys', () => {
    function planDeployment({ oldVersion, newVersion }) {
      return [
        { step: 'Deploy new version alongside old', status: 'pending' },
        { step: 'Shift traffic gradually', status: 'pending' },
        { step: 'Retire old version', status: 'pending' },
      ].map(item => ({ ...item, oldVersion, newVersion }));
    }
    return planDeployment;
  }, 'E-commerce frontend rolling out a new checkout without interrupting shoppers.');
};
