# useWhyDidYouUpdate Hook

## Problem
When debugging unexpected React re-renders, it is useful to know which props changed between renders. The challenge is to surface those differences without sprinkling console logs all over the component tree.

## Solution
`useWhyDidYouUpdate` stores the previous props in a ref and compares them on each render. When it detects changes, it prints a diff object to the console. The included demo shows how to integrate the hook with a `ProfileCard` component so developers can trace prop mutations quickly.

## Usage
```js
useWhyDidYouUpdate("ProfileCard", props);
```

This folder exports the hook and a small React sample wired through `src/index.js`. Bundle it with `npm start` (after adding a bundler) or reuse the hook directly in another project.
