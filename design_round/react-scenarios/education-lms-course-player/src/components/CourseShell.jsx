import React from 'react';

export function CourseShell({ data = {} }) {
  return (
    <section className="component course-shell">
      <header>
        <h2>CourseShell</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
