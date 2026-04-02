import { useMemo, useState, useEffect } from 'react';
import './styles.css';

const AVATARS = [
  { id: 'ada', name: 'Ada Lovelace', role: 'Mathematician & Writer', color: '#F59E0B' },
  { id: 'grace', name: 'Grace Hopper', role: 'Rear Admiral & Computer Scientist', color: '#16A34A' },
  { id: 'linus', name: 'Linus Torvalds', role: 'Kernel Maintainer', color: '#2563EB' },
  { id: 'margaret', name: 'Margaret Hamilton', role: 'Lead Software Engineer', color: '#EF4444' },
  { id: 'guido', name: 'Guido van Rossum', role: 'Python Creator', color: '#A855F7' },
  { id: 'yukihiro', name: 'Yukihiro Matsumoto', role: 'Ruby Creator', color: '#0EA5E9' },
  { id: 'denise', name: 'Denise Cooper', role: 'Open Source Champion', color: '#F97316' },
  { id: 'brendan', name: 'Brendan Eich', role: 'JavaScript Creator', color: '#14B8A6' }
];

const SIZES = {
  sm: 48,
  md: 72,
  lg: 96
};

export default function App() {
  const [search, setSearch] = useState('');
  const [size, setSize] = useState('md');
  const [selectedId, setSelectedId] = useState(AVATARS[0].id);

  const filteredAvatars = useMemo(
    () =>
      AVATARS.filter((avatar) =>
        avatar.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  useEffect(() => {
    if (!filteredAvatars.some((avatar) => avatar.id === selectedId) && filteredAvatars.length) {
      setSelectedId(filteredAvatars[0].id);
    }
  }, [filteredAvatars, selectedId]);

  const selectedAvatar = useMemo(
    () => AVATARS.find((avatar) => avatar.id === selectedId),
    [selectedId]
  );

  return (
    <main className="avatar-picker">
      <header className="avatar-picker__header">
        <div>
          <h1>Avatar Picker</h1>
          <p>Choose the avatar that represents you inside the workspace.</p>
        </div>
        <div className="avatar-picker__sizes">
          {Object.entries(SIZES).map(([key, value]) => (
            <button
              key={key}
              type="button"
              className={size === key ? 'is-active' : ''}
              onClick={() => setSize(key)}
              aria-label={`Use ${key} avatars`}
            >
              {value}px
            </button>
          ))}
        </div>
      </header>

      <div className="avatar-picker__controls">
        <input
          type="search"
          placeholder="Search by name…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <section className="avatar-picker__grid">
        {filteredAvatars.map((avatar) => (
          <button
            key={avatar.id}
            type="button"
            className={`avatar ${selectedId === avatar.id ? 'avatar--selected' : ''}`}
            onClick={() => setSelectedId(avatar.id)}
            style={{ width: SIZES[size], height: SIZES[size] }}
          >
            <span
              className="avatar__circle"
              style={{ backgroundColor: avatar.color }}
            >
              {avatar.name[0]}
            </span>
            <span className="avatar__caption">{avatar.name}</span>
          </button>
        ))}
        {!filteredAvatars.length && (
          <p className="avatar-picker__empty">No avatars matched your search.</p>
        )}
      </section>

      {selectedAvatar && (
        <aside className="avatar-picker__preview">
          <div
            className="avatar-picker__preview-circle"
            style={{
              backgroundColor: selectedAvatar.color,
              width: SIZES[size] * 1.2,
              height: SIZES[size] * 1.2
            }}
          >
            {selectedAvatar.name[0]}
          </div>
          <div>
            <h2>{selectedAvatar.name}</h2>
            <p>{selectedAvatar.role}</p>
            <p className="avatar-picker__preview-hint">
              This avatar will appear across comments, issues, and notifications.
            </p>
          </div>
        </aside>
      )}
    </main>
  );
}
