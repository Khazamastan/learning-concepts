import React from 'react';
import { FleetShell } from './components/FleetShell.jsx';
import { FleetMap } from './components/FleetMap.jsx';
import { TimelinePanel } from './components/TimelinePanel.jsx';
import { VehicleDrawer } from './components/VehicleDrawer.jsx';
import { AlertCenter } from './components/AlertCenter.jsx';

const demoData = {
  "FleetShell": {
    "region": "West Coast"
  },
  "FleetMap": {
    "vehicles": 182
  },
  "TimelinePanel": {
    "stops": [
      "Warehouse 4",
      "Depot 9"
    ]
  },
  "VehicleDrawer": {
    "vehicle": "TR-204",
    "eta": "14:05"
  },
  "AlertCenter": {
    "alerts": [
      "Delay on route 28"
    ]
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <FleetShell data={demoData["FleetShell"]} />
      <FleetMap data={demoData["FleetMap"]} />
      <TimelinePanel data={demoData["TimelinePanel"]} />
      <VehicleDrawer data={demoData["VehicleDrawer"]} />
      <AlertCenter data={demoData["AlertCenter"]} />
    </main>
  );
}
