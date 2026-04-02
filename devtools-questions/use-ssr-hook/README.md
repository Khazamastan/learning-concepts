# useSSR Hook

## Problem
Server-rendered React components need a reliable way to know when they are executing on the server versus the client so they can gate browser-only APIs or animations.

## Solution
`useSSR` keeps a `isServer` boolean in state, defaulting to `true` and flipping to `false` inside a `useEffect`. Because effects run only on the client, the hook immediately tells consumers whether they are on the client (`isClient`) or still within the initial server render. The repository ships with a tiny demo that prints the environment to the screen.

## Usage
```js
const { isServer, isClient } = useSSR();
```

Run the provided demo (after installing a React bundler) or import the hook into your own project.
