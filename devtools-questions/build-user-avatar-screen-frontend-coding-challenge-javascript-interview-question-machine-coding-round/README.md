# Build a User Avatar Screen

## Problem
Design an avatar management screen similar to product design challenges:

- Display team members with avatars, names, roles, and team tags.
- Provide search and team filters.
- Allow selecting/deselecting multiple members, surfacing the chosen list.
- Keep the UI responsive, keyboard accessible, and visually engaging.

## Solution
The React + Vite app seeds a roster of users, exposes chip filters for teams, and
allows free-text search. Selected users are tracked in a `Set`, displayed in a
“Selected” summary, and toggled by clicking cards or pressing Enter/Space. The
UI delivers a dark, glassmorphic look with responsive grid layouts and reusable
avatar components.

## Running locally
```
npm install
npm run dev
```
