import { useEffect, useMemo, useState } from 'react';
import './styles.css';

const STAGES = [
  { id: 'design', label: 'Design review', weight: 15 },
  { id: 'dev', label: 'Implementation', weight: 35 },
  { id: 'testing', label: 'Testing & QA', weight: 25 },
  { id: 'docs', label: 'Docs & handoff', weight: 15 },
  { id: 'launch', label: 'Launch', weight: 10 }
];

export default function App() {
  const [progress, setProgress] = useState(35);
  const [activeStages, setActiveStages] = useState(() => new Set(['design', 'dev']));
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => {
      setProgress((value) => {
        const delta = Math.random() * 12 + 4;
        const next = Math.min(100, value + delta);
        if (next >= 100) {
          setRunning(false);
        }
        return next;
      });
    }, 450);

    return () => window.clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const completed = Array.from(activeStages);
    const total = completed.reduce((sum, stageId) => {
      const stage = STAGES.find((item) => item.id === stageId);
      return stage ? sum + stage.weight : sum;
    }, 0);
    setProgress(Math.min(100, total));
  }, [activeStages]);

  const milestone = useMemo(() => {
    if (progress >= 100) return '✅ Ready to launch';
    if (progress >= 75) return '🚀 Final polish underway';
    if (progress >= 50) return '🧪 QA in motion';
    if (progress >= 25) return '💻 Build in progress';
    return '✏️ Planning';
  }, [progress]);

  const toggleStage = (id) => {
    setActiveStages((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <main className="progress-shell">
      <section className="progress-card">
        <header>
          <p className="eyebrow">Build tracker</p>
          <h1>Animated Progress Bar</h1>
          <p className="support">Toggle stages or auto-play to animate the bar with easing transitions.</p>
        </header>
        <div className="bar">
          <div className="bar-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <div className="bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="bar-label">{Math.round(progress)}%</span>
        </div>
        <p className="milestone" aria-live="polite">{milestone}</p>
        <ul className="stage-list">
          {STAGES.map((stage) => (
            <li key={stage.id}>
              <label>
                <input
                  type="checkbox"
                  checked={activeStages.has(stage.id)}
                  onChange={() => toggleStage(stage.id)}
                />
                <span>{stage.label}</span>
                <span className="weight">{stage.weight}%</span>
              </label>
            </li>
          ))}
        </ul>
        <footer className="controls">
          <button type="button" onClick={() => setRunning((value) => !value)}>
            {running ? 'Pause auto-fill' : 'Auto-fill to 100%'}
          </button>
          <button type="button" onClick={() => { setRunning(false); setActiveStages(new Set()); setProgress(0); }}>
            Reset
          </button>
        </footer>
      </section>
    </main>
  );
}
