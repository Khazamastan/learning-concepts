import { useMemo, useState } from 'react';

const MENU_ITEMS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    description: 'Overview of key metrics and performance.',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '🗂️',
    description: 'Manage your current initiatives and timelines.',
  },
  {
    id: 'team',
    label: 'Team',
    icon: '👥',
    description: 'Collaborate with teammates and assign roles.',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    icon: '🗓️',
    description: 'Track meetings, deadlines, and reminders.',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    description: 'Configure preferences, notifications, and themes.',
  },
];

export default function App() {
  const [activeId, setActiveId] = useState(MENU_ITEMS[0].id);

  const activeItem = useMemo(
    () => MENU_ITEMS.find((item) => item.id === activeId) ?? MENU_ITEMS[0],
    [activeId],
  );

  return (
    <div className="layout">
      <aside className="sidebar" aria-label="Primary">
        <h1>Workspace</h1>
        <nav>
          <ul>
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={item.id === activeId ? 'is-active' : ''}
                  onClick={() => setActiveId(item.id)}
                  aria-current={item.id === activeId ? 'page' : undefined}
                >
                  <span role="img" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="content" aria-live="polite">
        <header>
          <span className="icon" role="img" aria-hidden="true">
            {activeItem.icon}
          </span>
          <h2>{activeItem.label}</h2>
        </header>
        <p>{activeItem.description}</p>
        <footer>
          <button type="button" className="primary">Open Section</button>
          <button type="button" className="ghost">Pin to Favourites</button>
        </footer>
      </main>
    </div>
  );
}
