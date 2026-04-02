import React from 'react';
import { ControlPanelShell } from './components/ControlPanelShell.jsx';
import { DeviceGrid } from './components/DeviceGrid.jsx';
import { SceneBuilder } from './components/SceneBuilder.jsx';
import { EnergyAnalytics } from './components/EnergyAnalytics.jsx';
import { NotificationDrawer } from './components/NotificationDrawer.jsx';

const demoData = {
  "ControlPanelShell": {
    "home": "Oakridge Residence"
  },
  "DeviceGrid": {
    "rooms": [
      "Living Room",
      "Kitchen"
    ]
  },
  "SceneBuilder": {
    "scene": "Movie Night"
  },
  "EnergyAnalytics": {
    "todayKWh": 42.7
  },
  "NotificationDrawer": {
    "notifications": [
      "Garage door open"
    ]
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <ControlPanelShell data={demoData["ControlPanelShell"]} />
      <DeviceGrid data={demoData["DeviceGrid"]} />
      <SceneBuilder data={demoData["SceneBuilder"]} />
      <EnergyAnalytics data={demoData["EnergyAnalytics"]} />
      <NotificationDrawer data={demoData["NotificationDrawer"]} />
    </main>
  );
}
