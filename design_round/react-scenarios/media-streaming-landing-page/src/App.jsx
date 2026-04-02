import React from 'react';
import { LandingLayout } from './components/LandingLayout.jsx';
import { HeroCarousel } from './components/HeroCarousel.jsx';
import { CollectionRow } from './components/CollectionRow.jsx';
import { SignupModal } from './components/SignupModal.jsx';
import { FeatureHighlights } from './components/FeatureHighlights.jsx';

const demoData = {
  "LandingLayout": {
    "variant": "hero-experiment-a"
  },
  "HeroCarousel": {
    "titles": [
      "The Last Horizon",
      "Midnight Run"
    ]
  },
  "CollectionRow": {
    "label": "Trending",
    "items": [
      "Show A",
      "Show B",
      "Show C"
    ]
  },
  "SignupModal": {
    "cta": "Start your free trial"
  },
  "FeatureHighlights": {
    "highlights": [
      "Watch anywhere",
      "Cancel anytime"
    ]
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <LandingLayout data={demoData["LandingLayout"]} />
      <HeroCarousel data={demoData["HeroCarousel"]} />
      <CollectionRow data={demoData["CollectionRow"]} />
      <SignupModal data={demoData["SignupModal"]} />
      <FeatureHighlights data={demoData["FeatureHighlights"]} />
    </main>
  );
}
