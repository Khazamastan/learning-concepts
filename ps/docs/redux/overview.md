# Redux Fundamentals

## Core Concepts
- **Store** – Holds application state tree; created via `configureStore` or `createStore`.
- **Actions** – Plain objects describing what happened (`type` + payload).
- **Reducers** – Pure functions `(state, action) => newState`.
- **Dispatch** – Sends actions to reducers (`store.dispatch(addTodo())`).
- **Selectors** – Encapsulate state reads (`selectTodos(state)`).

## Toolkit Slice Example
```js
import { createSlice, configureStore } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    added(state, action) {
      state.push(action.payload);
    },
    toggled(state, action) {
      const item = state.find((todo) => todo.id === action.payload);
      if (item) {
        item.done = item.done === true ? false : true;
      }
    }
  }
});

export const { added, toggled } = todosSlice.actions;

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer
  }
});
```

## Usage with React
```jsx
import { Provider, useDispatch, useSelector } from 'react-redux';

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.done === true}
              onChange={() => dispatch(toggled(todo.id))}
            />
            {todo.text}
          </label>
        </li>
      ))}
    </ul>
  );
}
```
