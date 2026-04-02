# Metrics Polling Optimization (React 19)

## React 19 Enhancements

- Leverages `useEffectEvent` so the polling logic keeps the latest closures without needing to re-register timers.
- Continues to reuse `useState`/`useRef` for memoized payload comparison, ensuring renders occur only when metrics change.
- Fetch call opts into `cache: 'no-store'`, aligning with React 19’s data-fetching recommendations for fresh server data.

## Usage Notes

1. Deploy the component inside a Suspense boundary if you want to surface loading states beyond the initial mount.
2. For server-centric apps, move `fetchMetrics` into a Server Action and pass the result via props; the memoization logic still applies.
3. Adjust the polling cadence by changing the timeout value—React 19’s timers behave the same as in React 18.
