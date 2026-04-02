import React from 'react';
import { WorkspaceShell } from './components/WorkspaceShell.jsx';
import { EditorPane } from './components/EditorPane.jsx';
import { TerminalPanel } from './components/TerminalPanel.jsx';
import { PresenceSidebar } from './components/PresenceSidebar.jsx';
import { DeploymentPanel } from './components/DeploymentPanel.jsx';

const demoData = {
  "WorkspaceShell": {
    "repo": "frontend-app",
    "branch": "feature/live"
  },
  "EditorPane": {
    "file": "src/App.jsx",
    "language": "jsx"
  },
  "TerminalPanel": {
    "session": "npm run dev",
    "status": "running"
  },
  "PresenceSidebar": {
    "users": [
      "Ada",
      "Lin",
      "Sam"
    ]
  },
  "DeploymentPanel": {
    "latest": "deploy_4821",
    "status": "success"
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <WorkspaceShell data={demoData["WorkspaceShell"]} />
      <EditorPane data={demoData["EditorPane"]} />
      <TerminalPanel data={demoData["TerminalPanel"]} />
      <PresenceSidebar data={demoData["PresenceSidebar"]} />
      <DeploymentPanel data={demoData["DeploymentPanel"]} />
    </main>
  );
}
