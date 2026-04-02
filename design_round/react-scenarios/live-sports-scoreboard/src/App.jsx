import React from 'react';
import { ScoreboardLayout } from './components/ScoreboardLayout.jsx';
import { GameCard } from './components/GameCard.jsx';
import { PlayByPlayFeed } from './components/PlayByPlayFeed.jsx';
import { FavoritesSidebar } from './components/FavoritesSidebar.jsx';
import { FeedHealthWidget } from './components/FeedHealthWidget.jsx';

const demoData = {
  "ScoreboardLayout": {
    "date": "2026-04-02",
    "leagues": [
      "NBA",
      "EPL"
    ]
  },
  "GameCard": {
    "home": "Wolves",
    "away": "Kings",
    "score": "102-98",
    "period": "Q4 01:24"
  },
  "PlayByPlayFeed": {
    "events": [
      "Wolves timeout",
      "Kings turnover"
    ]
  },
  "FavoritesSidebar": {
    "favorites": [
      "Wolves",
      "Red Sox"
    ]
  },
  "FeedHealthWidget": {
    "connection": "ws",
    "latencyMs": 182
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <ScoreboardLayout data={demoData["ScoreboardLayout"]} />
      <GameCard data={demoData["GameCard"]} />
      <PlayByPlayFeed data={demoData["PlayByPlayFeed"]} />
      <FavoritesSidebar data={demoData["FavoritesSidebar"]} />
      <FeedHealthWidget data={demoData["FeedHealthWidget"]} />
    </main>
  );
}
