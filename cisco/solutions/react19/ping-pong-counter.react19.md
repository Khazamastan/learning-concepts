# Ping-Pong Counter (React 19)

## React 19 Enhancements

- Uses the new `useEffectEvent` hook so the interval callback (`tick`) always reads the latest state without appearing in dependency arrays.
- Wraps the state update in `startTransition` to keep urgent updates (like button presses) responsive even if the interval work becomes heavy.

## Usage Notes

1. `useEffectEvent` is only available in React 19+. For older versions, move `tick` inside the `setInterval` callback or wrap it in `useCallback`.
2. Transitions are ideal when the counter update drives expensive rendering; otherwise the pattern behaves the same as a normal `setState`.
3. Resetting clears the direction ref and state, ensuring the next play cycle restarts from zero.
