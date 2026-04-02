import { useMemo, useState } from 'react';

export const ChatForm = ({ onAdd }) => {
  const [message, setMessage] = useState('');
  const [subSteps, setSubSteps] = useState(4);
  const [failureRate, setFailureRate] = useState(20);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const isValid = useMemo(() => message.trim().length > 0 && subSteps > 0, [message, subSteps]);

  const enqueueChat = () => {
    if (!isValid) {
      return;
    }

    onAdd({
      message: message.trim(),
      subOperationCount: subSteps,
      failureChance: Math.min(Math.max(failureRate, 0), 100) / 100
    });

    setMessage('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    enqueueChat();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      enqueueChat();
    }
  };

  return (
    <section className="composer" aria-label="Create chat run">
      <form className="composer-form" onSubmit={handleSubmit}>
        <div className="composer-input">
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Message. Press Enter to enqueue."
            onKeyDown={handleKeyDown}
          />
          <p className="composer-hint">Shift + Enter for newline</p>
        </div>

        <div className="composer-footer">
          <div className="composer-controls">
            <button
              type="button"
              className="ghost-btn"
              onClick={() => setIsAdvancedOpen((prev) => !prev)}
              aria-expanded={isAdvancedOpen}
            >
              {isAdvancedOpen ? 'Hide advanced' : 'Show advanced'}
            </button>
            {isAdvancedOpen && (
              <div className="advanced-controls">
                <label className="control">
                  <span>Sub operations</span>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={subSteps}
                    onChange={(event) => setSubSteps(Number(event.target.value))}
                  />
                  <span className="control-value">{subSteps}</span>
                </label>
                <label className="control">
                  <span>Failure chance %</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={failureRate}
                    onChange={(event) => setFailureRate(Number(event.target.value))}
                  />
                  <span className="control-value">{failureRate}%</span>
                </label>
              </div>
            )}
          </div>

          <button className="send-btn" type="submit" disabled={!isValid}>
            <span>Enqueue</span>
            <span aria-hidden>➜</span>
          </button>
        </div>
      </form>
    </section>
  );
};
