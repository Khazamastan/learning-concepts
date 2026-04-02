import React from 'react';
import { IoTShell } from './components/IoTShell.jsx';
import { DeviceTable } from './components/DeviceTable.jsx';
import { DeviceMap } from './components/DeviceMap.jsx';
import { DeviceDetailDrawer } from './components/DeviceDetailDrawer.jsx';
import { FirmwarePanel } from './components/FirmwarePanel.jsx';

const demoData = {
  "IoTShell": {
    "fleet": "Factory Line A"
  },
  "DeviceTable": {
    "devices": 5423
  },
  "DeviceMap": {
    "regions": [
      "NA",
      "EU",
      "APAC"
    ]
  },
  "DeviceDetailDrawer": {
    "device": "PLC-882",
    "status": "warning"
  },
  "FirmwarePanel": {
    "version": "2.4.1",
    "rollout": "phase-2"
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <IoTShell data={demoData["IoTShell"]} />
      <DeviceTable data={demoData["DeviceTable"]} />
      <DeviceMap data={demoData["DeviceMap"]} />
      <DeviceDetailDrawer data={demoData["DeviceDetailDrawer"]} />
      <FirmwarePanel data={demoData["FirmwarePanel"]} />
    </main>
  );
}
