import React from 'react';

export function ReplyComposer({ data = {} }) {
  return (
    <section className="component reply-composer">
      <header>
        <h2>ReplyComposer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
