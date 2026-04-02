# Redux Thunk and Async Flow

## What is Thunk Middleware?
- Allows action creators to return a function instead of an action object.
- The function receives `dispatch` (and optionally `getState`) to orchestrate async calls.
- Widely used for fetch sequences, optimistic updates, and conditional dispatch.

## Toolkit `createAsyncThunk`
- Wraps common thunk boilerplate.
- Generates pending/fulfilled/rejected action types handled in `extraReducers`.

## Manual Thunk Example
```js
export const saveTodo = (todo) => async (dispatch, getState) => {
  dispatch(todoSaving());
  const token = getState().auth.token;
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(todo)
  });
  if (response.ok === false) {
    dispatch(todoSaveFailed(await response.text()));
    return;
  }
  dispatch(todoSaved(await response.json()));
};
```

## Testing Strategy
- Mock fetch using `msw` or Jest spies.
- Assert the correct sequence of dispatched actions via `redux-mock-store` or the store's `subscribe` API.
