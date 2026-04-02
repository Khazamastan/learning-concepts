import React from 'react';
import { ModerationShell } from './components/ModerationShell.jsx';
import { QueueList } from './components/QueueList.jsx';
import { ContentViewer } from './components/ContentViewer.jsx';
import { DecisionPanel } from './components/DecisionPanel.jsx';
import { MetricsSidebar } from './components/MetricsSidebar.jsx';

const demoData = {
  "ModerationShell": {
    "queue": "High Priority"
  },
  "QueueList": {
    "items": [
      "post_4002",
      "post_4003"
    ]
  },
  "ContentViewer": {
    "itemId": "post_4002",
    "mediaType": "image"
  },
  "DecisionPanel": {
    "actions": [
      "Approve",
      "Reject",
      "Escalate"
    ]
  },
  "MetricsSidebar": {
    "sla": "4m remaining"
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <ModerationShell data={demoData["ModerationShell"]} />
      <QueueList data={demoData["QueueList"]} />
      <ContentViewer data={demoData["ContentViewer"]} />
      <DecisionPanel data={demoData["DecisionPanel"]} />
      <MetricsSidebar data={demoData["MetricsSidebar"]} />
    </main>
  );
}
