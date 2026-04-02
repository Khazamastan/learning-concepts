import React from 'react';
import { PatientShell } from './components/PatientShell.jsx';
import { AppointmentScheduler } from './components/AppointmentScheduler.jsx';
import { LabResultsViewer } from './components/LabResultsViewer.jsx';
import { SecureMessenger } from './components/SecureMessenger.jsx';
import { BillingCenter } from './components/BillingCenter.jsx';

const demoData = {
  "PatientShell": {
    "patient": "Jamie",
    "alerts": [
      "Upcoming appointment"
    ]
  },
  "AppointmentScheduler": {
    "providers": [
      "Dr. Lee",
      "Dr. Patel"
    ]
  },
  "LabResultsViewer": {
    "latest": {
      "test": "CBC",
      "status": "Normal"
    }
  },
  "SecureMessenger": {
    "threads": 2
  },
  "BillingCenter": {
    "balance": 240.75
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <PatientShell data={demoData["PatientShell"]} />
      <AppointmentScheduler data={demoData["AppointmentScheduler"]} />
      <LabResultsViewer data={demoData["LabResultsViewer"]} />
      <SecureMessenger data={demoData["SecureMessenger"]} />
      <BillingCenter data={demoData["BillingCenter"]} />
    </main>
  );
}
