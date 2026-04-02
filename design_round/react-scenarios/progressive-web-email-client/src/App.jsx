import React from 'react';
import { AppShell } from './components/AppShell.jsx';
import { ThreadList } from './components/ThreadList.jsx';
import { MessageViewer } from './components/MessageViewer.jsx';
import { ComposeDrawer } from './components/ComposeDrawer.jsx';
import { SyncStatusBanner } from './components/SyncStatusBanner.jsx';

const demoData = {
  "AppShell": {
    "user": "Jordan",
    "labels": [
      "Inbox",
      "Starred",
      "Drafts"
    ]
  },
  "ThreadList": {
    "threads": [
      {
        "id": "t1",
        "subject": "Welcome to the new inbox",
        "unread": true
      },
      {
        "id": "t2",
        "subject": "Invoice for April",
        "unread": false
      }
    ]
  },
  "MessageViewer": {
    "threadId": "t1",
    "snippet": "Here is a preview of your newest feature..."
  },
  "ComposeDrawer": {
    "draft": {
      "to": [
        "team@example.com"
      ],
      "subject": "Re: Product Roadmap"
    }
  },
  "SyncStatusBanner": {
    "status": "online",
    "lastSync": "2026-04-02T09:15:00Z"
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <AppShell data={demoData["AppShell"]} />
      <ThreadList data={demoData["ThreadList"]} />
      <MessageViewer data={demoData["MessageViewer"]} />
      <ComposeDrawer data={demoData["ComposeDrawer"]} />
      <SyncStatusBanner data={demoData["SyncStatusBanner"]} />
    </main>
  );
}
