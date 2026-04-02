# Interactive Color Picker with Throttle

This mini project demonstrates how to throttle a rapidly changing signal (a color value) before feeding it into expensive UI work. Drag the color input as fast as you like—the “raw” preview reflects your immediate choice, while the throttled preview and its dependent UI updates only change every _n_ milliseconds.

## Key ideas

- **Throttling hook** – `useThrottle` remembers the last time it published a value and delays subsequent updates until the chosen interval elapses. Expensive renders, API calls, or analytics events can subscribe to the throttled value instead of the noisy source.
- **Dual preview** – Showing both the raw and throttled colors makes it obvious how the throttling behaves: the raw swatch follows your cursor; the throttled one updates at a capped cadence.
- **Observable timeline** – A short log highlights the order in which “raw” and “throttled” events arrive, reinforcing how the throttle smooths out bursts.
- **Configurable delay** – A range slider lets you choose the throttle window from 0 ms (no throttling) up to 1000 ms.

## Project structure

```
interactive-color-picker-with-throttle/
├── index.html                # Vite entry point
├── package.json              # React + Vite dependencies/scripts
├── src/
│   ├── index.jsx             # Mounts the app
│   ├── InteractiveColorPicker.jsx
│   ├── styles.css
│   └── useThrottle.js        # Reusable throttle hook
└── vite.config.js
```

## Running locally

```bash
cd interactive-color-picker-with-throttle
npm install
npm run dev
```

Vite opens [http://localhost:5173](http://localhost:5173) with hot reloading.

## How throttling is implemented

1. Every change to the `color` state triggers an effect in `useThrottle`.
2. If enough time (≥ `delay` ms) passed since the last publish, the hook updates immediately.
3. Otherwise `setTimeout` schedules a publish for the remaining time slice. Multiple rapid updates collapse into a single timeout.
4. The hook stores the “public” value in a ref so consumers always receive the last emitted value without creating extra renders.
5. Consumers (like the throttled swatch or a network request) subscribe to the throttled value and only react when the hook says it’s safe.

Choosing throttling (instead of debouncing) is useful when you still want regular updates during a drag—but not _every_ frame. It’s a common pattern for color pickers, sliders controlling heavy canvases, or feeding telemetry dashboards.
