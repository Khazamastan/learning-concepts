import React from 'react';

export function QuizEngine({ data = {} }) {
  return (
    <section className="component quiz-engine">
      <header>
        <h2>QuizEngine</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
