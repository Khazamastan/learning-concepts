import { useMemo, useState } from 'react';
import './styles.css';

const initialComments = [
  {
    id: 'c1',
    author: 'Ada Lovelace',
    text: 'Loved the new release cycle notes. Would be great to see more about testing.',
    timestamp: '2 hours ago',
    replies: [
      {
        id: 'c1-1',
        author: 'Grace Hopper',
        text: 'Seconding this! Perhaps add a section on regression coverage?',
        timestamp: '1 hour ago',
        replies: []
      }
    ]
  },
  {
    id: 'c2',
    author: 'Alan Turing',
    text: 'Consider highlighting benchmark numbers in the summary cards.',
    timestamp: '4 hours ago',
    replies: []
  }
];

function createComment(text) {
  return {
    id: crypto.randomUUID(),
    author: 'You',
    text,
    timestamp: 'just now',
    replies: []
  };
}

function addReply(tree, targetId, reply) {
  return tree.map((node) => {
    if (node.id === targetId) {
      return { ...node, replies: [...node.replies, reply] };
    }
    if (node.replies.length === 0) return node;
    return { ...node, replies: addReply(node.replies, targetId, reply) };
  });
}

function CommentNode({ comment, depth, onReply, collapsed, onToggle }) {
  return (
    <div className="thread" style={{ marginLeft: depth === 0 ? 0 : depth * 16 }}>
      <article className="comment">
        <header>
          <strong>{comment.author}</strong>
          <span className="timestamp">{comment.timestamp}</span>
        </header>
        <p>{comment.text}</p>
        <footer>
          <button type="button" onClick={() => onReply(comment.id)}>
            Reply
          </button>
          {comment.replies.length > 0 && (
            <button type="button" onClick={() => onToggle(comment.id)}>
              {collapsed.has(comment.id) ? 'Expand' : 'Collapse'} {comment.replies.length}
            </button>
          )}
        </footer>
      </article>
      {!collapsed.has(comment.id) && comment.replies.length > 0 && (
        <div className="replies">
          {comment.replies.map((reply) => (
            <CommentNode
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              onReply={onReply}
              collapsed={collapsed}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [comments, setComments] = useState(initialComments);
  const [replyToId, setReplyToId] = useState(null);
  const [draft, setDraft] = useState('');
  const [collapsed, setCollapsed] = useState(() => new Set());

  const totalCount = useMemo(() => {
    const countTree = (nodes) => nodes.reduce((sum, node) => sum + 1 + countTree(node.replies), 0);
    return countTree(comments);
  }, [comments]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!draft.trim() || !replyToId) return;
    setComments((tree) => addReply(tree, replyToId, createComment(draft.trim())));
    setDraft('');
    setReplyToId(null);
  };

  return (
    <main className="comments-shell">
      <section className="comments-card">
        <header>
          <p className="eyebrow">Feedback</p>
          <h1>Nested Comments</h1>
          <p className="support">Recursive rendering with expand/collapse controls.</p>
          <span className="count">{totalCount} comments</span>
        </header>
        <div className="comments">
          {comments.map((comment) => (
            <CommentNode
              key={comment.id}
              comment={comment}
              depth={0}
              onReply={setReplyToId}
              collapsed={collapsed}
              onToggle={(id) =>
                setCollapsed((prev) => {
                  const next = new Set(prev);
                  if (next.has(id)) next.delete(id);
                  else next.add(id);
                  return next;
                })
              }
            />
          ))}
        </div>
        <form className="reply-form" onSubmit={handleSubmit}>
          <label>
            <span>Replying to</span>
            <select value={replyToId ?? ''} onChange={(event) => setReplyToId(event.target.value || null)}>
              <option value="">Select a comment…</option>
              {comments.flatMap((comment) => [comment, ...comment.replies]).map((node) => (
                <option key={node.id} value={node.id}>
                  {node.author}
                </option>
              ))}
            </select>
          </label>
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Share your thoughts"
            rows={3}
          />
          <button type="submit" disabled={!draft.trim() || !replyToId}>
            Post reply
          </button>
        </form>
      </section>
    </main>
  );
}
