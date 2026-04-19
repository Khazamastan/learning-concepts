import React, { useEffect, useReducer, useState } from 'react';

/**
 * Problem #59: Editable todo list in React
 *
 * Detailed Problem Statement:
 * Build todo list with add, edit, delete, mark done.
 *
 * Example Input:
 * Add: "Learn JS", Edit to "Learn Advanced JS"
 *
 * Example Output:
 * List updates live with edited value
 */

export const problem = 'Editable todo list in React';

export const statement = `
Build todo list with add, edit, delete, mark done.
`.trim();

export const exampleInput = `
Add: "Learn JS", Edit to "Learn Advanced JS"
`.trim();

export const exampleOutput = `
List updates live with edited value
`.trim();

// Approach 1: Basic useState CRUD todo list
export function EditableTodoSolution1() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const text = input.trim();
    if (!text) return;
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
    setInput('');
  };

  const updateTodo = (id, patch) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...patch } : todo)));
  };

  return (
    <section>
      <h3>Editable Todo List</h3>
      <div style={{ display: 'flex', gap: 8 }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a task" />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul style={{ paddingLeft: 18 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginTop: 8 }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => updateTodo(todo.id, { done: !todo.done })}
            />
            <input
              value={todo.text}
              onChange={(e) => updateTodo(todo.id, { text: e.target.value })}
              style={{ marginLeft: 8 }}
            />
            <button onClick={() => setTodos((prev) => prev.filter((x) => x.id !== todo.id))} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

// Approach 2: useReducer-based todo management
function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'EDIT':
      return state.map((t) => (t.id === action.id ? { ...t, text: action.text } : t));
    case 'TOGGLE':
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'DELETE':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

export function EditableTodoSolution2() {
  const [text, setText] = useState('');
  const [todos, dispatch] = useReducer(todoReducer, []);

  const add = () => {
    const value = text.trim();
    if (!value) return;
    dispatch({ type: 'ADD', text: value });
    setText('');
  };

  return (
    <section>
      <h3>Reducer Todo List</h3>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Task" />
      <button onClick={add} style={{ marginLeft: 8 }}>
        Add
      </button>

      {todos.map((todo) => (
        <div key={todo.id} style={{ marginTop: 10, display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={todo.done} onChange={() => dispatch({ type: 'TOGGLE', id: todo.id })} />
          <input value={todo.text} onChange={(e) => dispatch({ type: 'EDIT', id: todo.id, text: e.target.value })} />
          <button onClick={() => dispatch({ type: 'DELETE', id: todo.id })}>Delete</button>
        </div>
      ))}
    </section>
  );
}

// Approach 3: LocalStorage-persisted todo list
export function EditableTodoSolution3() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('editable-todos') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('editable-todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <section>
      <h3>Persistent Todo List</h3>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button
          onClick={() => {
            const value = text.trim();
            if (!value) return;
            setTodos((prev) => [...prev, { id: Date.now(), text: value, done: false }]);
            setText('');
          }}
        >
          Add
        </button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} style={{ marginTop: 8 }}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() =>
              setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)))
            }
          />
          <input
            value={todo.text}
            onChange={(e) =>
              setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, text: e.target.value } : t)))
            }
          />
          <button onClick={() => setTodos((prev) => prev.filter((t) => t.id !== todo.id))}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export default EditableTodoSolution1;
