'use client';

import React, { memo, useDeferredValue, useMemo } from 'react';

const ListItem = memo(function ListItem({ name }) {
  return <li>{name}</li>;
});

const MyComponent = memo(function MyComponent({ items }) {
  const deferredItems = useDeferredValue(items);

  const normalizedItems = useMemo(
    () => deferredItems.map((item) => ({ id: item.id, name: item.name.trim() })),
    [deferredItems],
  );

  return (
    <div>
      <ul>
        {normalizedItems.map((item) => (
          <ListItem key={item.id} name={item.name} />
        ))}
      </ul>
    </div>
  );
});

export default MyComponent;
