import React from 'react';

export function LessonPlayer({ data = {} }) {
  return (
    <section className="component lesson-player">
      <header>
        <h2>LessonPlayer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
