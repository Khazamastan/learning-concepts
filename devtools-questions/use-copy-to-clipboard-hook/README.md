# useCopyToClipboard Hook

## Problem
Web apps often need to copy text to the clipboard and give the user immediate feedback (success, failure, last value copied).

## Solution
`useCopyToClipboard` wraps the Clipboard API. The hook exposes `copy(value)` plus `copiedText` and `error` state so components can render toasts or inline messages. On success, the copied value remains available for a configurable timeout before clearing.

## Usage
```js
const { copy, copiedText, error } = useCopyToClipboard();
```

A demo component in `src/index.js` copies a sample URL to showcase the hook.
