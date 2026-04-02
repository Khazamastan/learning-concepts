import React from 'react';
import { AuthoringShell } from './components/AuthoringShell.jsx';
import { DocumentEditor } from './components/DocumentEditor.jsx';
import { MetadataPanel } from './components/MetadataPanel.jsx';
import { ReviewSidebar } from './components/ReviewSidebar.jsx';
import { PublishingConsole } from './components/PublishingConsole.jsx';

const demoData = {
  "AuthoringShell": {
    "article": "Integration Setup"
  },
  "DocumentEditor": {
    "status": "draft"
  },
  "MetadataPanel": {
    "tags": [
      "api",
      "integration"
    ]
  },
  "ReviewSidebar": {
    "openComments": 4
  },
  "PublishingConsole": {
    "scheduled": false
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <AuthoringShell data={demoData["AuthoringShell"]} />
      <DocumentEditor data={demoData["DocumentEditor"]} />
      <MetadataPanel data={demoData["MetadataPanel"]} />
      <ReviewSidebar data={demoData["ReviewSidebar"]} />
      <PublishingConsole data={demoData["PublishingConsole"]} />
    </main>
  );
}
