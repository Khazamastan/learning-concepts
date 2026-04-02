const STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled'
};

const formatDuration = (ms) => `${(ms / 1000).toFixed(1)}s`;

const statusTone = (status) => {
  switch (status) {
    case 'processing':
      return 'status-pill processing';
    case 'completed':
      return 'status-pill completed';
    case 'failed':
      return 'status-pill failed';
    case 'cancelled':
      return 'status-pill cancelled';
    default:
      return 'status-pill pending';
  }
};

const formatTimestamp = (ms) => {
  if (!ms) {
    return 'Queued just now';
  }
  const formatted = new Date(ms).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  return `Queued ${formatted}`;
};

export const ChatCard = ({ chat, isExpanded, onToggleExpand, onAbort, onRetry, isActive }) => {
  const headerStatus = STATUS_LABELS[chat.status] ?? chat.status;
  const showRetry = ['failed', 'completed', 'cancelled'].includes(chat.status);
  const canAbort = chat.status === 'processing';
  const cardClassName = ['chat-card', chat.status, isActive ? 'is-active' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <article className={cardClassName}>
      <span className="timeline-marker" aria-hidden="true" />
      <header className="chat-card-header" onClick={onToggleExpand} role="button" tabIndex={0}>
        <div>
          <h3>{chat.message.slice(0, 72)}{chat.message.length > 72 ? '…' : ''}</h3>
          <p className="chat-meta">
            Attempt #{chat.attemptCount} • Failure chance {(chat.failureChance * 100).toFixed(0)}% • {formatTimestamp(chat.createdAt)}
          </p>
        </div>
        <div className="status-block">
          <span className={statusTone(chat.status)}>{headerStatus}</span>
          <span className={`chevron ${isExpanded ? 'open' : ''}`} aria-hidden>▾</span>
        </div>
      </header>
      {isExpanded && (
        <div className="chat-card-body">
          <div className="chat-detail">
            <p className="chat-message">{chat.message}</p>
            <div className="action-bar">
              <button className="action-btn" onClick={onAbort} disabled={!canAbort}>
                Abort
              </button>
              <button className="action-btn" onClick={onRetry} disabled={!showRetry}>
                Retry
              </button>
            </div>
          </div>
          <div className="sub-operations-list">
            {chat.subOperations.map((step) => (
              <div className="sub-operation" key={step.id}>
                <span className="name">{step.name}</span>
                <span className="duration">{formatDuration(step.durationMs)}</span>
                <span className={`status ${step.status}`}>
                  {STATUS_LABELS[step.status] ?? step.status}
                  {step.error && <em> – {step.error}</em>}
                </span>
              </div>
            ))}
          </div>
          {chat.lastError && <p className="error-text">{chat.lastError}</p>}
        </div>
      )}
    </article>
  );
};
