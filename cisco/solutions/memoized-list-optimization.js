import React, { useMemo } from 'react';

const ListItem = React.memo(function ListItem({ name }) {
  return <li>{name}</li>;
});

const MyComponent = React.memo(function MyComponent({ items }) {
  const normalizedItems = useMemo(
    () => items.map((item) => ({ id: item.id, name: item.name.trim() })),
    [items],
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
