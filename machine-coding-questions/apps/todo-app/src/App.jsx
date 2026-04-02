import { useEffect, useMemo, useState } from 'react';
import './styles.css';

const STORAGE_KEY = 'react19-todo-app';

const FILTERS = {
  all: (task) => true,
  active: (task) => !task.completed,
  completed: (task) => task.completed
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [draft, setDraft] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setTasks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Unable to parse tasks', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const visibleTasks = useMemo(() => tasks.filter(FILTERS[filter]), [tasks, filter]);
  const completedCount = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);

  const handleCreate = (event) => {
    event.preventDefault();
    const value = draft.trim();
    if (!value) return;
    const todo = {
      id: crypto.randomUUID(),
      title: value,
      completed: false,
      createdAt: Date.now()
    };
    setTasks((list) => [todo, ...list]);
    setDraft('');
  };

  const toggleTask = (id) => {
    setTasks((list) =>
      list.map((task) => (task.id === id ? { ...task, completed: !task.completed, updatedAt: Date.now() } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((list) => list.filter((task) => task.id !== id));
  };

  const beginEdit = (task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  const saveEdit = () => {
    if (!editingId) return;
    const value = editingText.trim();
    if (!value) {
      deleteTask(editingId);
    } else {
      setTasks((list) =>
        list.map((task) => (task.id === editingId ? { ...task, title: value, updatedAt: Date.now() } : task))
      );
    }
    setEditingId(null);
    setEditingText('');
  };

  return (
    <main className="todo-shell">
      <section className="todo-card">
        <header>
          <p className="eyebrow">Tasks</p>
          <h1>To-Do App with Local Storage</h1>
          <p className="support">
            Create, update, complete, and delete tasks. State persists to <code>localStorage</code>.
          </p>
        </header>
        <form className="composer" onSubmit={handleCreate}>
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Add a task, e.g. “Ship modal component”"
            aria-label="Task title"
          />
          <button type="submit" disabled={!draft.trim()}>
            Add task
          </button>
        </form>
        <nav className="filters" aria-label="Task filters">
          {Object.keys(FILTERS).map((key) => (
            <button
              key={key}
              type="button"
              className={filter === key ? 'active' : ''}
              onClick={() => setFilter(key)}
            >
              {key}
            </button>
          ))}
        </nav>
        <ul className="task-list">
          {visibleTasks.length === 0 ? (
            <li className="empty">No tasks in this view.</li>
          ) : (
            visibleTasks.map((task) => {
              const isEditing = editingId === task.id;
              return (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <label className="task">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    {isEditing ? (
                      <input
                        className="edit-input"
                        value={editingText}
                        onChange={(event) => setEditingText(event.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') saveEdit();
                          if (event.key === 'Escape') {
                            setEditingId(null);
                            setEditingText('');
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <span onDoubleClick={() => beginEdit(task)}>{task.title}</span>
                    )}
                  </label>
                  <div className="item-actions">
                    <button type="button" onClick={() => beginEdit(task)} aria-label="Edit task">
                      Edit
                    </button>
                    <button type="button" onClick={() => deleteTask(task.id)} aria-label="Delete task">
                      Delete
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
        <footer className="meta">
          <span>
            {completedCount} completed · {tasks.length - completedCount} remaining
          </span>
          <button
            type="button"
            className="clear"
            onClick={() => setTasks((list) => list.filter((task) => !task.completed))}
            disabled={completedCount === 0}
          >
            Clear completed
          </button>
        </footer>
      </section>
    </main>
  );
}
