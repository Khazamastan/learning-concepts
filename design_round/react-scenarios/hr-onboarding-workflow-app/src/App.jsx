import React from 'react';
import { OnboardingShell } from './components/OnboardingShell.jsx';
import { TimelineView } from './components/TimelineView.jsx';
import { TaskDrawer } from './components/TaskDrawer.jsx';
import { DocumentCenter } from './components/DocumentCenter.jsx';
import { WorkflowBuilder } from './components/WorkflowBuilder.jsx';

const demoData = {
  "OnboardingShell": {
    "employee": "Taylor",
    "role": "Frontend Engineer"
  },
  "TimelineView": {
    "tasks": [
      "Paperwork",
      "Equipment Setup"
    ]
  },
  "TaskDrawer": {
    "currentTask": "Submit ID"
  },
  "DocumentCenter": {
    "documents": [
      "W-4",
      "Direct Deposit"
    ]
  },
  "WorkflowBuilder": {
    "templates": [
      "Engineering",
      "Sales"
    ]
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <OnboardingShell data={demoData["OnboardingShell"]} />
      <TimelineView data={demoData["TimelineView"]} />
      <TaskDrawer data={demoData["TaskDrawer"]} />
      <DocumentCenter data={demoData["DocumentCenter"]} />
      <WorkflowBuilder data={demoData["WorkflowBuilder"]} />
    </main>
  );
}
