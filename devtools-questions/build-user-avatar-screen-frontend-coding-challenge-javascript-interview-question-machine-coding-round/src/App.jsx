import { useMemo, useState } from 'react';

const USERS = [
  { id: 'u1', name: 'Ava Stone', role: 'Product Designer', team: 'Design', avatar: 'https://i.pravatar.cc/150?img=32' },
  { id: 'u2', name: 'Max Chen', role: 'Frontend Engineer', team: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'u3', name: 'Lena Ortiz', role: 'QA Analyst', team: 'Quality', avatar: 'https://i.pravatar.cc/150?img=45' },
  { id: 'u4', name: 'Noah Patel', role: 'Backend Engineer', team: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=28' },
  { id: 'u5', name: 'Mia Rossi', role: 'UX Researcher', team: 'Design', avatar: 'https://i.pravatar.cc/150?img=36' },
  { id: 'u6', name: 'Ethan Walker', role: 'Product Manager', team: 'Product', avatar: 'https://i.pravatar.cc/150?img=23' },
  { id: 'u7', name: 'Zoe Harper', role: 'Mobile Engineer', team: 'Engineering', avatar: 'https://i.pravatar.cc/150?img=41' },
  { id: 'u8', name: 'Kai Nguyen', role: 'Data Scientist', team: 'Analytics', avatar: 'https://i.pravatar.cc/150?img=55' },
];

const teams = ['All', ...Array.from(new Set(USERS.map((user) => user.team)))];

export default function App() {
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState('All');
  const [selected, setSelected] = useState(() => new Set(['u2', 'u6']));

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();
    return USERS.filter((user) => {
      const matchesTeam = team === 'All' || user.team === team;
      const matchesQuery =
        query.length === 0 ||
        user.name.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query);
      return matchesTeam && matchesQuery;
    });
  }, [search, team]);

  const toggleSelection = (userId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  const selectedUsers = USERS.filter((user) => selected.has(user.id));

  return (
    <div className="avatar-app">
      <header>
        <h1>Assign Collaborators</h1>
        <p>Select teammates to add them to the project. Filter by function or search by name.</p>
        <div className="controls">
          <input
            type="search"
            placeholder="Search people"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <div className="team-filter">
            {teams.map((teamName) => (
              <button
                key={teamName}
                type="button"
                className={teamName === team ? 'chip active' : 'chip'}
                onClick={() => setTeam(teamName)}
              >
                {teamName}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="selected">
        <h2>
          Selected ({selected.size})
          {selected.size > 0 && (
            <button type="button" className="clear" onClick={() => setSelected(new Set())}>
              Clear
            </button>
          )}
        </h2>
        {selected.size === 0 ? (
          <p className="hint">No collaborators chosen yet.</p>
        ) : (
          <ul className="avatar-stack">
            {selectedUsers.map((user) => (
              <li key={user.id}>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="grid">
        {filteredUsers.map((user) => {
          const isActive = selected.has(user.id);
          return (
            <article
              key={user.id}
              className={isActive ? 'card active' : 'card'}
              onClick={() => toggleSelection(user.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggleSelection(user.id);
                }
              }}
            >
              <img src={user.avatar} alt={user.name} className="avatar" />
              <div className="info">
                <h3>{user.name}</h3>
                <p>{user.role}</p>
              </div>
              <span className="team-badge">{user.team}</span>
            </article>
          );
        })}
        {filteredUsers.length === 0 && <p className="hint">No matches for this filter.</p>}
      </section>
    </div>
  );
}
