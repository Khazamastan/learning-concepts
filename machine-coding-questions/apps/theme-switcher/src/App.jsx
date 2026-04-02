import { useEffect, useState } from 'react';
import './styles.css';

const STORAGE_KEY = 'react19-theme';
const THEMES = ['light', 'dark', 'dim'];

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEY) ?? 'light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  return (
    <main className="theme-shell">
      <section className="theme-card">
        <header>
          <p className="eyebrow">Appearance</p>
          <h1>Theme Switcher</h1>
          <p className="support">Persist preferences in localStorage and update the root dataset.</p>
        </header>
        <div className="controls">
          <label className="switch">
            <span className="label">Theme</span>
            <div className="options">
              {THEMES.map((option) => (
                <button
                  key={option}
                  type="button"
                  className={option === theme ? 'option active' : 'option'}
                  onClick={() => setTheme(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </label>
        </div>
        <div className="preview">
          <div className="card">
            <h2>Preview</h2>
            <p>See how cards will look with the current theme setting.</p>
            <button type="button">Primary action</button>
          </div>
          <div className="card outline">
            <h2>Secondary</h2>
            <p>Muted surface for secondary content blocks.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
