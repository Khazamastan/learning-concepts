import React from 'react';
import { BillingShell } from './components/BillingShell.jsx';
import { SubscriptionCard } from './components/SubscriptionCard.jsx';
import { InvoiceTable } from './components/InvoiceTable.jsx';
import { UsageChartPanel } from './components/UsageChartPanel.jsx';
import { AuditLogDrawer } from './components/AuditLogDrawer.jsx';

const demoData = {
  "BillingShell": {
    "account": "Acme Corp",
    "currency": "USD"
  },
  "SubscriptionCard": {
    "plan": "Enterprise",
    "renewalDate": "2026-05-01"
  },
  "InvoiceTable": {
    "invoices": [
      {
        "id": "INV-2001",
        "amount": 1299.0,
        "status": "Paid"
      },
      {
        "id": "INV-2002",
        "amount": 1399.0,
        "status": "Due"
      }
    ]
  },
  "UsageChartPanel": {
    "metrics": [
      {
        "name": "API Calls",
        "value": 92000
      },
      {
        "name": "Seats",
        "value": 134
      }
    ]
  },
  "AuditLogDrawer": {
    "entries": [
      "Plan updated",
      "Webhook verified"
    ]
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <BillingShell data={demoData["BillingShell"]} />
      <SubscriptionCard data={demoData["SubscriptionCard"]} />
      <InvoiceTable data={demoData["InvoiceTable"]} />
      <UsageChartPanel data={demoData["UsageChartPanel"]} />
      <AuditLogDrawer data={demoData["AuditLogDrawer"]} />
    </main>
  );
}
