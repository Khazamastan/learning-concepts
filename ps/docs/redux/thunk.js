import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetch', async () => {
  const response = await fetch('/api/todos');
  if (response.ok === false) {
    throw new Error('Unable to fetch todos');
  }
  return response.json();
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const store = configureStore({
  reducer: {
    todos: todosSlice.reducer
  }
});
