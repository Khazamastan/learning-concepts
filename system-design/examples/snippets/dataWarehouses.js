module.exports = register => {
  register('dataWarehouses', () => {
    function aggregateRevenue(rows) {
      return rows.reduce((acc, row) => {
        const bucket = acc[row.date] || { date: row.date, total: 0 };
        bucket.total += row.amount;
        acc[row.date] = bucket;
        return acc;
      }, {});
    }
    return aggregateRevenue;
  }, 'Subscription business analyzing daily revenue in a columnar warehouse.');
};
