import { useMemo, useState } from 'react';
import { ChatCard } from './ChatCard.jsx';

export const ChatList = ({ chats, onAbort, onRetry, activeChatId }) => {
  const [expandedChatId, setExpandedChatId] = useState(null);

  const orderedChats = useMemo(
    () => [...chats].sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0)),
    [chats]
  );

  const toggleExpand = (chatId) => {
    setExpandedChatId((current) => (current === chatId ? null : chatId));
  };

  return (
    <section className="queue-feed" aria-label="Chat queue">
      <header className="queue-feed-header">
        <div>
          <h2>Queue Timeline</h2>
          <p>Newest chats appear first. Expand a row to inspect the promise chain.</p>
        </div>
        <span className="queue-count">{orderedChats.length} run{orderedChats.length === 1 ? '' : 's'}</span>
      </header>

      <div className="chat-queue-list">
        {orderedChats.map((chat) => (
          <ChatCard
            key={chat.id}
            chat={chat}
            isExpanded={expandedChatId === chat.id}
            onToggleExpand={() => toggleExpand(chat.id)}
            onAbort={() => onAbort(chat.id)}
            onRetry={() => onRetry(chat.id)}
            isActive={activeChatId === chat.id}
          />
        ))}
      </div>
    </section>
  );
};
