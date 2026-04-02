import React from 'react';
import { SearchShell } from './components/SearchShell.jsx';
import { SearchForm } from './components/SearchForm.jsx';
import { ResultsPane } from './components/ResultsPane.jsx';
import { MapPanel } from './components/MapPanel.jsx';
import { ItineraryDrawer } from './components/ItineraryDrawer.jsx';

const demoData = {
  "SearchShell": {
    "searchId": "S-30019"
  },
  "SearchForm": {
    "from": "SFO",
    "to": "CDG",
    "dates": [
      "2026-06-01",
      "2026-06-14"
    ]
  },
  "ResultsPane": {
    "flights": 124,
    "hotels": 87
  },
  "MapPanel": {
    "selectedHotel": "Le Grand"
  },
  "ItineraryDrawer": {
    "collaborators": [
      "Jordan",
      "Priya"
    ]
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <SearchShell data={demoData["SearchShell"]} />
      <SearchForm data={demoData["SearchForm"]} />
      <ResultsPane data={demoData["ResultsPane"]} />
      <MapPanel data={demoData["MapPanel"]} />
      <ItineraryDrawer data={demoData["ItineraryDrawer"]} />
    </main>
  );
}
