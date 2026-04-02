import React from 'react';
import { PortfolioShell } from './components/PortfolioShell.jsx';
import { AssetAllocationChart } from './components/AssetAllocationChart.jsx';
import { PerformanceGraph } from './components/PerformanceGraph.jsx';
import { TransactionTable } from './components/TransactionTable.jsx';
import { GoalTracker } from './components/GoalTracker.jsx';

const demoData = {
  "PortfolioShell": {
    "owner": "Alex",
    "netWorth": 1250000
  },
  "AssetAllocationChart": {
    "allocation": [
      {
        "label": "Equities",
        "value": 55
      },
      {
        "label": "Fixed Income",
        "value": 30
      },
      {
        "label": "Alternatives",
        "value": 15
      }
    ]
  },
  "PerformanceGraph": {
    "period": "1Y",
    "change": 12.4
  },
  "TransactionTable": {
    "recent": [
      "Buy AAPL",
      "Sell GOOGL"
    ]
  },
  "GoalTracker": {
    "goals": [
      "Retirement",
      "College Fund"
    ]
  }
};

export default function App() {
  return (
    <main className="app-shell">
      <PortfolioShell data={demoData["PortfolioShell"]} />
      <AssetAllocationChart data={demoData["AssetAllocationChart"]} />
      <PerformanceGraph data={demoData["PerformanceGraph"]} />
      <TransactionTable data={demoData["TransactionTable"]} />
      <GoalTracker data={demoData["GoalTracker"]} />
    </main>
  );
}
