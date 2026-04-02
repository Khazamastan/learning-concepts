import { useState } from 'react';
import './styles.css';

const SECTIONS = [
  {
    id: 'introduction',
    title: 'Guidelines',
    content:
      'Keep sections concise. Only one panel stays open at a time, making it easy for readers to scan through content.'
  },
  {
    id: 'setup',
    title: 'Initial Setup',
    content:
      'Install dependencies, configure environment variables, and run the onboarding script to provision default data.'
  },
  {
    id: 'deployment',
    title: 'Deployment Checklist',
    content:
      'Verify tests, bump the version, generate a changelog, and request approvals before promoting to production.'
  }
];

export default function App() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  return (
    <main className="accordion">
      <h1>Auto-Collapsible Accordion</h1>
      <section>
        {SECTIONS.map((section) => {
          const isOpen = section.id === activeId;
          return (
            <article key={section.id} className={`accordion__item ${isOpen ? 'is-open' : ''}`}>
              <button type="button" onClick={() => setActiveId(section.id)}>
                {section.title}
              </button>
              {isOpen && <p>{section.content}</p>}
            </article>
          );
        })}
      </section>
    </main>
  );
}
