import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';

const TABS = [
  {
    id: 'overview',
    label: 'Overview',
    description: 'High-level summary of the project status and health metrics.'
  },
  {
    id: 'updates',
    label: 'Updates',
    description: 'Recent changelog entries, upcoming releases, and blockers.'
  },
  {
    id: 'insights',
    label: 'Insights',
    description: 'Historical charts, velocity insights, and prediction models.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const tabRefs = useRef(new Map());

  useEffect(() => {
    tabRefs.current.get(activeTab)?.focus();
  }, [activeTab]);

  const activeContent = useMemo(() => {
    switch (activeTab) {
      case 'overview':
        return {
          title: 'Build Overview',
          body:
            'Track sprint goals, teammate focus areas, and open risks in one place. Highlights are recalculated every deploy.'
        };
      case 'updates':
        return {
          title: 'Latest Updates',
          body:
            'Version 19.4 deployed on April 1, 2026 with improved caching. Next release scheduled for April 8 with focus on accessibility.'
        };
      case 'insights':
        return {
          title: 'Team Insights',
          body:
            'Delivery velocity up 12% this quarter. Error budget remains healthy at 94%. Consider investing in automated regression tests.'
        };
      default:
        return { title: 'Unknown', body: 'Select a tab to continue.' };
    }
  }, [activeTab]);

  const handleKeyDown = (event, index) => {
    const currentIndex = index;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      const next = (currentIndex + 1) % TABS.length;
      setActiveTab(TABS[next].id);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = (currentIndex - 1 + TABS.length) % TABS.length;
      setActiveTab(TABS[prev].id);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      setActiveTab(TABS[0].id);
    }
    if (event.key === 'End') {
      event.preventDefault();
      setActiveTab(TABS[TABS.length - 1].id);
    }
  };

  return (
    <main className="tabs-shell">
      <section className="tabs-card">
        <header>
          <p className="eyebrow">Dashboard</p>
          <h1>Tabs Component</h1>
          <p className="support">Keyboard-accessible tabs with ARIA roles and roving tab index.</p>
        </header>
        <div className="tabs" role="tablist" aria-label="Project navigation">
          {TABS.map((tab, index) => {
            const selected = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                role="tab"
                ref={(node) => node && tabRefs.current.set(tab.id, node)}
                id={`tab-${tab.id}`}
                aria-selected={selected}
                aria-controls={`panel-${tab.id}`}
                tabIndex={selected ? 0 : -1}
                className={selected ? 'tab active' : 'tab'}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
              >
                <span className="tab-label">{tab.label}</span>
                <span className="tab-desc">{tab.description}</span>
              </button>
            );
          })}
        </div>
        <article
          id={`panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeTab}`}
          tabIndex={0}
          className="tab-panel"
        >
          <h2>{activeContent.title}</h2>
          <p>{activeContent.body}</p>
        </article>
      </section>
    </main>
  );
}
