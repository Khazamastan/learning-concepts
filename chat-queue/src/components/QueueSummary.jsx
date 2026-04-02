export const QueueSummary = ({ metrics }) => {
  const items = [
    { label: 'In Queue', value: metrics.pending },
    { label: 'Processing', value: metrics.processing },
    { label: 'Completed', value: metrics.completed },
    { label: 'Failed', value: metrics.failed },
    { label: 'Cancelled', value: metrics.cancelled }
  ];

  return (
    <div className="queue-summary" role="status" aria-live="polite">
      <div className="summary-total">
        <span className="value">{metrics.total}</span>
        <span className="label">Total runs</span>
      </div>
      <div className="summary-grid">
        {items.map((item) => (
          <span className="summary-chip" key={item.label}>
            <span className="chip-value">{item.value}</span>
            {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};
