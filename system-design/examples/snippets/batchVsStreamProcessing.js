module.exports = register => {
  register('batchVsStreamProcessing', () => {
    function batchProcess(records) {
      return records.reduce((acc, item) => acc + item.amount, 0);
    }
    function streamProcess(record, state = { total: 0 }) {
      state.total += record.amount;
      return state;
    }
    return { batchProcess, streamProcess };
  }, 'Fraud system combining nightly risk scoring with real-time anomaly detection.');
};
