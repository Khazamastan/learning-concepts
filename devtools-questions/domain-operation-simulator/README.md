# Domain Operation Simulator

Interactive dashboard that demonstrates the lifecycle of domain names—registration, renewal, expiration, auto-renew toggles, and transfer requests. Ideal for onboarding customer support engineers or explaining registry flows.

## Features

- **Registration form** with configurable term lengths.
- **Portfolio table** displaying status, expiration, auto-renew state, and quick-action buttons.
- **Timeline log** capturing DNS operations chronologically.
- **Responsive layout** that converts the table to a stacked list on narrow screens.

## Project layout

```
domain-operation-simulator/
├── index.html
├── package.json
├── src/
│   ├── DomainOperationSimulator.jsx
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd domain-operation-simulator
npm install
npm run dev
```

Browse to `http://localhost:5173` to operate the simulator.

## Implementation details

- Domain records are stored in component state with fields for `status`, `expiration`, and `autoRenew`.
- Helper utilities (`futureDate`, `extendDate`) keep date arithmetic encapsulated.
- Buttons change state via immutable updates; every mutation appends a log entry with emoji-coded summaries.
- The simulator intentionally prevents duplicate registrations when a domain isn’t “Available,” mirroring real-world registry constraints.
