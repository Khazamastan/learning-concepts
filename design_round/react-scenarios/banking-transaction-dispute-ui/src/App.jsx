import React from 'react';
import { DisputeShell } from './components/DisputeShell.jsx';
import { TransactionTable } from './components/TransactionTable.jsx';
import { DisputeWizard } from './components/DisputeWizard.jsx';
import { CaseTimeline } from './components/CaseTimeline.jsx';
import { SecureMessages } from './components/SecureMessages.jsx';

const demoData = {
  "DisputeShell": {
    "customer": "Casey",
    "account": "**** 4421"
  },
  "TransactionTable": {
    "transactions": [
      "TX1001",
      "TX1002"
    ]
  },
  "DisputeWizard": {
    "step": 2,
    "totalSteps": 5
  },
  "CaseTimeline": {
    "milestones": [
      "Submitted",
      "Under Review"
    ]
  },
  "SecureMessages": {
    "messages": 3
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <DisputeShell data={demoData["DisputeShell"]} />
      <TransactionTable data={demoData["TransactionTable"]} />
      <DisputeWizard data={demoData["DisputeWizard"]} />
      <CaseTimeline data={demoData["CaseTimeline"]} />
      <SecureMessages data={demoData["SecureMessages"]} />
    </main>
  );
}
