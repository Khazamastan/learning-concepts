import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';

import { CalendarSwitcher } from './CalendarSwitcher.js';

export const AppLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app-shell">
      <aside className={clsx('sidebar', { hidden: !isSidebarOpen })}>
        <div className="sidebar-header">
          <h1 className="logo">Calendr</h1>
          <button type="button" className="toggle" onClick={() => setSidebarOpen((prev) => !prev)}>
            {isSidebarOpen ? '⟨' : '⟩'}
          </button>
        </div>
        <nav className="nav">
          <Link to="/" className={clsx('nav-link', { active: location.pathname === '/' })}>
            Dashboard
          </Link>
        </nav>
        <CalendarSwitcher />
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};
