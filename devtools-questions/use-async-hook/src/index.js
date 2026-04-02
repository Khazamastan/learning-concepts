import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useAsync } from './useAsync.js';

function UserCard() {
  const { status, value, error, run } = useAsync(() =>
    fetch('https://jsonplaceholder.typicode.com/users/1').then((response) => response.json()),
  []);

  useEffect(() => {
    run();
  }, [run]);

  if (status === 'idle' || status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'rejected') {
    return <p role="alert">Error: {error.message}</p>;
  }

  return (
    <article>
      <h2>{value.name}</h2>
      <p>{value.email}</p>
    </article>
  );
}

function App() {
  return (
    <main>
      <h1>useAsync demo</h1>
      <UserCard />
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
