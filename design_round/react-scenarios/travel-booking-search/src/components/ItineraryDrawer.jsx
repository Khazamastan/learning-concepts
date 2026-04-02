import React from 'react';

export function ItineraryDrawer({ data = {} }) {
  return (
    <section className="component itinerary-drawer">
      <header>
        <h2>ItineraryDrawer</h2>
      </header>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
