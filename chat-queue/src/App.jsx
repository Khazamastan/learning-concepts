import { ChatForm } from './components/ChatForm.jsx';
import { ChatList } from './components/ChatList.jsx';
import { QueueSummary } from './components/QueueSummary.jsx';
import { useChatQueue } from './hooks/useChatQueue.js';

const suggestionPrompts = [
  'What is recursion?',
  'Explain async/await in JS',
  'How do promises work?',
  'What is the event loop?',
  'Difference: null vs undefined',
  'What is a closure?',
  'Explain prototype chain'
];

const SuggestionChips = ({ onSelect }) => (
  <div className="suggestions">
    {suggestionPrompts.map((prompt) => (
      <button
        key={prompt}
        type="button"
        className="suggestion-chip"
        onClick={() => onSelect(prompt)}
      >
        {prompt}
      </button>
    ))}
  </div>
);

const EmptyState = ({ onSuggestion }) => (
  <div className="empty-stage" role="status" aria-live="polite">
    <div className="empty-badge" aria-hidden="true">
      <div className="empty-badge-glow" />
      <span className="empty-badge-icon">💬</span>
    </div>
    <h2>No chats yet</h2>
    <p>Type a message below and hit Enter. Each run spawns sequential child promises.</p>
    <SuggestionChips onSelect={onSuggestion} />
  </div>
);

const QuickPromptDock = ({ onSuggestion }) => (
  <section className="quick-dock" aria-label="Quick prompts">
    <div className="quick-dock-head">
      <h2>Spawn a run</h2>
      <p>Select a prompt to enqueue instantly or craft your own below.</p>
    </div>
    <SuggestionChips onSelect={onSuggestion} />
  </section>
);

export default function App() {
  const { chats, addChat, abortChat, retryChat, activeChatId, metrics } = useChatQueue();

  const handleSuggestion = (message) => {
    addChat({ message, subOperationCount: 4, failureChance: 0.2 });
  };

  return (
    <div className="app-shell">
      <div className="app-ambient" aria-hidden="true" />
      <div className="app-surface">
        <header className="app-header">
          <div className="brand-block">
            <span className="brand-avatar" aria-hidden="true">🟣</span>
            <div>
              <p className="brand-name">Promise Queue</p>
              <p className="brand-subtitle">Sequential chat orchestrator playground</p>
            </div>
          </div>
          <QueueSummary metrics={metrics} />
        </header>

        <main className="app-main" aria-live="polite">
          {chats.length === 0 ? (
            <EmptyState onSuggestion={handleSuggestion} />
          ) : (
            <>
              <QuickPromptDock onSuggestion={handleSuggestion} />
              <ChatList
                chats={chats}
                onAbort={abortChat}
                onRetry={retryChat}
                activeChatId={activeChatId}
              />
            </>
          )}
        </main>

        <ChatForm onAdd={addChat} />
      </div>
    </div>
  );
}
