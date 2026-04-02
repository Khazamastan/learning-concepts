import React from 'react';

export function FavoritesSidebar({ data = {} }) {
  return (
    <section className="component favorites-sidebar">
      <header>
        <h2>FavoritesSidebar</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
