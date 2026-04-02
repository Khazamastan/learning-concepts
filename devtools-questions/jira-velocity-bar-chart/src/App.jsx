import './styles.css';

const DATA = [
  { sprint: 'Sprint 1', committed: 32, completed: 28 },
  { sprint: 'Sprint 2', committed: 30, completed: 26 },
  { sprint: 'Sprint 3', committed: 28, completed: 29 },
  { sprint: 'Sprint 4', committed: 35, completed: 33 },
  { sprint: 'Sprint 5', committed: 31, completed: 30 }
];

const maxValue = Math.max(
  ...DATA.map((entry) => Math.max(entry.committed, entry.completed))
);

export default function App() {
  return (
    <main className="velocity-chart">
      <header>
        <h1>Velocity Overview</h1>
        <p>Committed vs. completed story points across recent sprints.</p>
      </header>
      <section className="velocity-chart__grid">
        {DATA.map((sprint) => (
          <article key={sprint.sprint} className="velocity-card">
            <h2>{sprint.sprint}</h2>
            <div className="velocity-card__bars">
              <div
                className="velocity-card__bar velocity-card__bar--committed"
                style={{ width: `${(sprint.committed / maxValue) * 100}%` }}
              >
                <span>{sprint.committed}</span>
              </div>
              <div
                className="velocity-card__bar velocity-card__bar--completed"
                style={{ width: `${(sprint.completed / maxValue) * 100}%` }}
              >
                <span>{sprint.completed}</span>
              </div>
            </div>
            <footer>
              <span className="velocity-card__label committed">Committed</span>
              <span className="velocity-card__label completed">Completed</span>
            </footer>
          </article>
        ))}
      </section>
    </main>
  );
}
