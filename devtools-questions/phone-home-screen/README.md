# Phone Home Screen

A React recreation of a modern smartphone home screen. Includes widgets, app grid, dock, wallpaper switching, edit (jiggle) mode, and lightweight app preview sheets.

## Highlights

- **Widget stack** for at-a-glance info (weather + activity).
- **App grid & dock** with notification badges and edit wiggle animation.
- **Wallpaper switcher** cycles through gradients to show theming.
- **Modal app sheet** demonstrates drilling into app content.

## Structure

```
phone-home-screen/
├── index.html
├── package.json
├── src/
│   ├── HomeScreen.jsx
│   ├── index.jsx
│   └── styles.css
└── vite.config.js
```

## Run locally

```bash
cd phone-home-screen
npm install
npm run dev
```

Open `http://localhost:5173` to interact with the screen.

## Implementation notes

- App data for grid/dock lives in plain arrays, making it easy to plug in real content.
- Clicking “Edit” toggles a CSS wiggle animation and shows removal dots, imitating native behavior.
- Opening an app presents an accessible dialog overlay with placeholder copy.
- Layout uses CSS grid and glassmorphism-style blurs to mirror contemporary mobile aesthetics.
