import React from 'react';
import { LiveSaleShell } from './components/LiveSaleShell.jsx';
import { VideoPlayer } from './components/VideoPlayer.jsx';
import { ChatPanel } from './components/ChatPanel.jsx';
import { ProductRail } from './components/ProductRail.jsx';
import { OverlayManager } from './components/OverlayManager.jsx';

const demoData = {
  "LiveSaleShell": {
    "event": "Spring Drop"
  },
  "VideoPlayer": {
    "viewerCount": 128000
  },
  "ChatPanel": {
    "messages": 645
  },
  "ProductRail": {
    "featured": [
      "Sneaker X",
      "Hoodie Y"
    ]
  },
  "OverlayManager": {
    "active": [
      "Flash Deal",
      "Poll"
    ]
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <LiveSaleShell data={demoData["LiveSaleShell"]} />
      <VideoPlayer data={demoData["VideoPlayer"]} />
      <ChatPanel data={demoData["ChatPanel"]} />
      <ProductRail data={demoData["ProductRail"]} />
      <OverlayManager data={demoData["OverlayManager"]} />
    </main>
  );
}
