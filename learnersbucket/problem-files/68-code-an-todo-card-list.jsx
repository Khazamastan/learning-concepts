import React, { useMemo, useState } from 'react';

/**
 * Problem #68: Code an Todo card list
 *
 * Detailed Problem Statement:
 * Render todo cards with title, description, status badge, and actions.
 *
 * Example Input:
 * [{ id: 1, title: 'Task', desc: 'Do X', done: false }]
 *
 * Example Output:
 * Card with task details and toggle button
 */

export const problem = 'Code an Todo card list';

export const statement = `
Render todo cards with title, description, status badge, and actions.
`.trim();

export const exampleInput = `
[{ id: 1, title: 'Task', desc: 'Do X', done: false }]
`.trim();

export const exampleOutput = `
Card with task details and toggle button
`.trim();

const defaultTodos = [
  { id: 1, title: 'Setup project', desc: 'Initialize React project', done: true },
  { id: 2, title: 'Build UI', desc: 'Create todo card list UI', done: false },
  { id: 3, title: 'Write tests', desc: 'Add component tests', done: false }
];

function TodoCard({ todo, onToggle, onDelete }) {
  return (
    <article style={{ border: '1px solid #ddd', borderRadius: 10, padding: 12, marginBottom: 10 }}>
      <h4 style={{ margin: 0 }}>{todo.title}</h4>
      <p style={{ margin: '6px 0' }}>{todo.desc}</p>
      <span
        style={{
          display: 'inline-block',
          padding: '3px 8px',
          borderRadius: 999,
          background: todo.done ? '#e5ffe5' : '#fff4cc'
        }}
      >
        {todo.done ? 'Done' : 'Pending'}
      </span>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onToggle(todo.id)}>Toggle</button>
        <button onClick={() => onDelete(todo.id)} style={{ marginLeft: 8 }}>
          Delete
        </button>
      </div>
    </article>
  );
}

// Approach 1: Basic card list
export function TodoCardListSolution1({ initial = defaultTodos }) {
  const [todos, setTodos] = useState(initial);

  return (
    <section>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={(id) =>
            setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
          }
          onDelete={(id) => setTodos((prev) => prev.filter((t) => t.id !== id))}
        />
      ))}
    </section>
  );
}

// Approach 2: Search + filterable card list
export function TodoCardListSolution2({ initial = defaultTodos }) {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState(initial);

  const filtered = useMemo(
    () => todos.filter((t) => t.title.toLowerCase().includes(query.toLowerCase())),
    [todos, query]
  );

  return (
    <section>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Filter by title"
        style={{ marginBottom: 10 }}
      />

      {filtered.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={(id) =>
            setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
          }
          onDelete={(id) => setTodos((prev) => prev.filter((t) => t.id !== id))}
        />
      ))}
    </section>
  );
}

// Approach 3: Grouped by status
export function TodoCardListSolution3({ initial = defaultTodos }) {
  const [todos, setTodos] = useState(initial);

  const groups = useMemo(
    () => ({
      pending: todos.filter((t) => !t.done),
      done: todos.filter((t) => t.done)
    }),
    [todos]
  );

  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
      <div>
        <h3>Pending</h3>
        {groups.pending.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={(id) =>
              setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
            }
            onDelete={(id) => setTodos((prev) => prev.filter((t) => t.id !== id))}
          />
        ))}
      </div>

      <div>
        <h3>Done</h3>
        {groups.done.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={(id) =>
              setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
            }
            onDelete={(id) => setTodos((prev) => prev.filter((t) => t.id !== id))}
          />
        ))}
      </div>
    </section>
  );
}

export default TodoCardListSolution1;
