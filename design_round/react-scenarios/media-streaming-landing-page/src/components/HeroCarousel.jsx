import React from 'react';

export function HeroCarousel({ data = {} }) {
  return (
    <section className="component hero-carousel">
      <header>
        <h2>HeroCarousel</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
