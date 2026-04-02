import React from 'react';
import { AgentWorkspace } from './components/AgentWorkspace.jsx';
import { TicketList } from './components/TicketList.jsx';
import { TicketDetail } from './components/TicketDetail.jsx';
import { ReplyComposer } from './components/ReplyComposer.jsx';
import { AnalyticsPanel } from './components/AnalyticsPanel.jsx';

const demoData = {
  "AgentWorkspace": {
    "agent": "Morgan",
    "queue": "Priority"
  },
  "TicketList": {
    "tickets": [
      "#4310",
      "#4311",
      "#4312"
    ]
  },
  "TicketDetail": {
    "id": "#4310",
    "customer": "Riley"
  },
  "ReplyComposer": {
    "macros": [
      "Welcome",
      "Refund"
    ]
  },
  "AnalyticsPanel": {
    "metrics": {
      "sla": "96%",
      "csat": "4.7"
    }
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <AgentWorkspace data={demoData["AgentWorkspace"]} />
      <TicketList data={demoData["TicketList"]} />
      <TicketDetail data={demoData["TicketDetail"]} />
      <ReplyComposer data={demoData["ReplyComposer"]} />
      <AnalyticsPanel data={demoData["AnalyticsPanel"]} />
    </main>
  );
}
