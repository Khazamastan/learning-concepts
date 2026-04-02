import React from 'react';
import { NegotiationShell } from './components/NegotiationShell.jsx';
import { DocumentViewer } from './components/DocumentViewer.jsx';
import { ClauseLibrary } from './components/ClauseLibrary.jsx';
import { WorkflowPanel } from './components/WorkflowPanel.jsx';
import { SignatureConsole } from './components/SignatureConsole.jsx';

const demoData = {
  "NegotiationShell": {
    "contract": "MSA-2026"
  },
  "DocumentViewer": {
    "version": "v12",
    "changes": 18
  },
  "ClauseLibrary": {
    "favorites": [
      "Limitation of Liability",
      "Force Majeure"
    ]
  },
  "WorkflowPanel": {
    "tasks": [
      "Finance approval",
      "Legal review"
    ]
  },
  "SignatureConsole": {
    "status": "pending"
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <NegotiationShell data={demoData["NegotiationShell"]} />
      <DocumentViewer data={demoData["DocumentViewer"]} />
      <ClauseLibrary data={demoData["ClauseLibrary"]} />
      <WorkflowPanel data={demoData["WorkflowPanel"]} />
      <SignatureConsole data={demoData["SignatureConsole"]} />
    </main>
  );
}
