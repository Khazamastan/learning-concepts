import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useWhyDidYouUpdate } from './useWhyDidYouUpdate.js';

function ProfileCard({ name, title }) {
  useWhyDidYouUpdate('ProfileCard', { name, title });
  return (
    <article>
      <h2>{name}</h2>
      <p>{title}</p>
    </article>
  );
}

function App() {
  const [name, setName] = useState('Ada Lovelace');
  const [title, setTitle] = useState('Mathematician');

  return (
    <div>
      <ProfileCard name={name} title={title} />
      <button type="button" onClick={() => setName('Ada Lovelace')}>
        Re-render with same name
      </button>
      <button type="button" onClick={() => setTitle('Pioneer Programmer')}>
        Update title
      </button>
    </div>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
