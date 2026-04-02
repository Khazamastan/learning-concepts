import { useState } from "react";

const samplePlaylists = [
  {
    id: "1",
    name: "Focus Flow",
    tracks: ["lofi-1", "lofi-2", "lofi-3"],
  },
  {
    id: "2",
    name: "Top Hits",
    tracks: ["pop-1", "pop-2"],
  },
];

const sampleTracks = {
  "lofi-1": { title: "Raindrop Study", artist: "Chillwave" },
  "lofi-2": { title: "Night Owl", artist: "Synth Lab" },
  "lofi-3": { title: "Soft Focus", artist: "Ambient Circle" },
  "pop-1": { title: "Skyline", artist: "Neon Fever" },
  "pop-2": { title: "Dancing Lights", artist: "Violetta" },
};

export default function SpotifyClientDemo() {
  const [playlists, setPlaylists] = useState(samplePlaylists);
  const [selected, setSelected] = useState(samplePlaylists[0].id);
  const [trackId, setTrackId] = useState("lofi-1");

  const current = playlists.find((playlist) => playlist.id === selected);

  function addTrack() {
    if (!trackId || !current) return;
    const info = sampleTracks[trackId];
    if (!info) {
      alert("Unknown track ID in demo dataset.");
      return;
    }
    const updated = playlists.map((playlist) =>
      playlist.id === current.id
        ? { ...playlist, tracks: [...playlist.tracks, trackId] }
        : playlist
    );
    setPlaylists(updated);
  }

  return (
    <div className="panel">
      <h2>Spotify Client (OAuth Simulation)</h2>
      <p>Select a playlist and add demo tracks to mimic playlist-modify scopes.</p>
      <label>
        Playlist
        <select
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
        >
          {playlists.map((playlist) => (
            <option key={playlist.id} value={playlist.id}>
              {playlist.name}
            </option>
          ))}
        </select>
      </label>
      {current && (
        <>
          <h3>{current.name}</h3>
          <ul>
            {current.tracks.map((id, index) => {
              const track = sampleTracks[id];
              return (
                <li key={`${id}-${index}`}>
                  <strong>{track?.title ?? id}</strong> — {track?.artist ?? "Unknown"}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <div className="form-grid">
        <label>
          Demo Track ID
          <input
            value={trackId}
            onChange={(event) => setTrackId(event.target.value)}
            placeholder="lofi-1"
          />
        </label>
        <button onClick={addTrack}>Add Track</button>
      </div>
      <section>
        <h3>Available Demo Tracks</h3>
        <ul>
          {Object.entries(sampleTracks).map(([id, data]) => (
            <li key={id}>
              <code>{id}</code> — {data.title} ({data.artist})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
