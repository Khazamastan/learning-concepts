'use client';

import React, { createContext, useCallback, useContext, useMemo, useReducer, useRef } from 'react';

const NotificationContext = createContext(null);

function notificationsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DISMISS':
      return state.filter((notification) => notification.id !== action.payload);
    case 'CLEAR':
      return [];
    default:
      return state;
  }
}

function createNotification({ counterRef, message, type = 'info', duration = 3000, metadata = {} }) {
  counterRef.current += 1;
  return {
    id: `toast-${counterRef.current}`,
    message,
    type,
    duration,
    metadata,
    createdAt: Date.now(),
  };
}

export function NotificationProvider({ children }) {
  const counterRef = useRef(0);
  const [notifications, dispatch] = useReducer(notificationsReducer, []);

  const api = useMemo(() => ({
    notify({ message, type, duration, metadata }) {
      const notification = createNotification({ counterRef, message, type, duration, metadata });
      dispatch({ type: 'ADD', payload: notification });
      return notification.id;
    },
    dismiss(id) {
      dispatch({ type: 'DISMISS', payload: id });
    },
    clear() {
      dispatch({ type: 'CLEAR' });
    },
  }), []);

  const value = useMemo(
    () => ({
      notifications,
      notify: api.notify,
      dismiss: api.dismiss,
      clear: api.clear,
    }),
    [notifications, api.clear, api.dismiss, api.notify],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationDemo() {
  const { notifications, notify, dismiss, clear } = useNotification();

  const addSuccess = useCallback(() => {
    notify({ message: 'Profile saved successfully', type: 'success', duration: 2000 });
  }, [notify]);

  const addError = useCallback(() => {
    notify({ message: 'Something went wrong', type: 'error' });
  }, [notify]);

  return (
    <section>
      <h2>useNotification Demo</h2>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <button type="button" onClick={addSuccess}>Trigger success</button>
        <button type="button" onClick={addError}>Trigger error</button>
        <button type="button" onClick={clear}>Clear all</button>
      </div>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            <strong>{notification.type.toUpperCase()}:</strong> {notification.message}
            <button
              type="button"
              onClick={() => dismiss(notification.id)}
              style={{ marginLeft: '0.5rem' }}
            >
              Dismiss
            </button>
          </li>
        ))}
      </ul>
      {notifications.length === 0 && <p>No notifications yet.</p>}
    </section>
  );
}
