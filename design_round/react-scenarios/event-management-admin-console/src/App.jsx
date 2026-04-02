import React from 'react';
import { AdminShell } from './components/AdminShell.jsx';
import { SchedulePlanner } from './components/SchedulePlanner.jsx';
import { SpeakerManager } from './components/SpeakerManager.jsx';
import { AttendeeDashboard } from './components/AttendeeDashboard.jsx';
import { NotificationCenter } from './components/NotificationCenter.jsx';

const demoData = {
  "AdminShell": {
    "event": "FutureTech Summit"
  },
  "SchedulePlanner": {
    "tracks": [
      "AI",
      "Cloud",
      "Security"
    ]
  },
  "SpeakerManager": {
    "speakers": 84
  },
  "AttendeeDashboard": {
    "registrations": 3200
  },
  "NotificationCenter": {
    "queued": 5
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <AdminShell data={demoData["AdminShell"]} />
      <SchedulePlanner data={demoData["SchedulePlanner"]} />
      <SpeakerManager data={demoData["SpeakerManager"]} />
      <AttendeeDashboard data={demoData["AttendeeDashboard"]} />
      <NotificationCenter data={demoData["NotificationCenter"]} />
    </main>
  );
}
