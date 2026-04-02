import * as React from "react";

const APPS = [
  { id: "calendar", label: "Calendar", color: "#f97316", notification: "21" },
  { id: "mail", label: "Mail", color: "#2563eb", notification: "12" },
  { id: "camera", label: "Camera", color: "#111827" },
  { id: "photos", label: "Photos", color: "#facc15" },
  { id: "music", label: "Music", color: "#9333ea", notification: "3" },
  { id: "notes", label: "Notes", color: "#fbbf24" },
  { id: "maps", label: "Maps", color: "#22c55e" },
  { id: "store", label: "Store", color: "#ef4444", notification: "5" },
  { id: "fitness", label: "Fitness", color: "#0ea5e9" },
  { id: "weather", label: "Weather", color: "#38bdf8" },
  { id: "clock", label: "Clock", color: "#0f172a" },
  { id: "settings", label: "Settings", color: "#475569" },
];

const DOCK_APPS = [
  { id: "phone", label: "Phone", color: "#22c55e" },
  { id: "messages", label: "Messages", color: "#2563eb", notification: "8" },
  { id: "browser", label: "Browser", color: "#64748b" },
  { id: "play", label: "Play", color: "#ef4444" },
];

const WALLPAPERS = [
  "linear-gradient(130deg, #0f172a, #172554, #1e3a8a)",
  "linear-gradient(180deg, #facc15, #f97316)",
  "linear-gradient(160deg, #34d399, #38bdf8)",
];

export function HomeScreen() {
  const [editMode, setEditMode] = React.useState(false);
  const [wallpaperIndex, setWallpaperIndex] = React.useState(0);
  const [activeApp, setActiveApp] = React.useState(null);
  const wallpaper = WALLPAPERS[wallpaperIndex];

  const toggleEditMode = () => setEditMode((mode) => !mode);

  const nextWallpaper = () => {
    setWallpaperIndex((index) => (index + 1) % WALLPAPERS.length);
  };

  const openApp = (app) => {
    setActiveApp(app);
    setEditMode(false);
  };

  const closeApp = () => setActiveApp(null);

  return (
    <div className="phone">
      <div className="phone-frame" style={{ backgroundImage: wallpaper }}>
        <StatusBar />
        <div className="widget-stack" aria-label="widgets">
          <Widget title="Weather">
            <strong>27°</strong>
            <span>Mumbai - Partly sunny</span>
          </Widget>
          <Widget title="Activity" hint="Daily move">
            <div className="ring">
              <span>78%</span>
            </div>
          </Widget>
        </div>
        <section className="app-grid" aria-label="Applications">
          {APPS.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              editMode={editMode}
              onOpen={() => openApp(app)}
            />
          ))}
        </section>
        <Dock apps={DOCK_APPS} editMode={editMode} onOpen={openApp} />
        <Controls
          editMode={editMode}
          onToggleEdit={toggleEditMode}
          onChangeWallpaper={nextWallpaper}
        />
      </div>

      {activeApp && (
        <AppSheet app={activeApp} onClose={closeApp} />
      )}
    </div>
  );
}

function StatusBar() {
  const date = React.useMemo(() => new Date(), []);
  const formattedTime = new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  return (
    <header className="status-bar" aria-label="Status bar">
      <span>{formattedTime}</span>
      <div className="status-icons" aria-hidden="true">
        <span>📶</span>
        <span>📡</span>
        <span>🔋</span>
      </div>
    </header>
  );
}

function Widget({ title, hint, children }) {
  return (
    <article className="widget" role="group" aria-label={title}>
      <div className="widget-head">
        <h2>{title}</h2>
        {hint && <small>{hint}</small>}
      </div>
      <div className="widget-body">{children}</div>
    </article>
  );
}

function AppIcon({ app, editMode, onOpen }) {
  return (
    <button
      type="button"
      className={`app-icon ${editMode ? "wiggle" : ""}`}
      onClick={onOpen}
      aria-label={app.label}
    >
      {editMode && <span className="delete-dot" aria-hidden="true">−</span>}
      <span
        className="app-glyph"
        style={{ backgroundColor: app.color }}
        aria-hidden="true"
      >
        {app.label.slice(0, 2)}
      </span>
      <span className="app-label">{app.label}</span>
      {app.notification && (
        <span className="badge" aria-label={`${app.notification} notifications`}>
          {app.notification}
        </span>
      )}
    </button>
  );
}

function Dock({ apps, editMode, onOpen }) {
  return (
    <nav className="dock" aria-label="Dock apps">
      {apps.map((app) => (
        <AppIcon key={app.id} app={app} editMode={editMode} onOpen={() => onOpen(app)} />
      ))}
    </nav>
  );
}

function Controls({ editMode, onToggleEdit, onChangeWallpaper }) {
  return (
    <footer className="controls" aria-label="Screen controls">
      <button type="button" onClick={onToggleEdit}>
        {editMode ? "Done" : "Edit"}
      </button>
      <button type="button" onClick={onChangeWallpaper}>
        Change wallpaper
      </button>
    </footer>
  );
}

function AppSheet({ app, onClose }) {
  return (
    <div className="app-sheet" role="dialog" aria-modal="true" aria-labelledby="app-title">
      <div className="app-sheet-content">
        <header>
          <h2 id="app-title">{app.label}</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>
        <p>
          This placeholder screen represents the “{app.label}” app. Use this template to
          demonstrate navigation from the home screen to deeper application content.
        </p>
      </div>
      <div className="sheet-backdrop" onClick={onClose} aria-hidden="true" />
    </div>
  );
}
