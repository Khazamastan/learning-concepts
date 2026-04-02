# Iframe Integration

## Component

`EmbeddedFrame` wraps `<iframe>` usage with sensible defaults:

- Defaults to a 600px tall, full-width frame.  
- Applies a restrictive sandbox (`allow-scripts allow-same-origin`).  
- Lets the caller override `allow`, `sandbox`, `width`, and `height`.

`postToIframe` demonstrates structured messaging with `window.postMessage`, enforcing that the iframe element exists before sending.

## Best Practices

- **Security:** use the most restrictive sandbox that still allows required capabilities; whitelist origins for messaging.  
- **Responsiveness:** keep the iframe fluid via CSS (`width: 100%`).  
- **Accessibility:** provide descriptive `title` text; announce loading state externally.  
- **Communication:** use `postMessage` with explicit `targetOrigin` to prevent data leakage.  
- **Loading Optimization:** enable `loading="lazy"` when deferring off-screen embeds.

## When to Choose Iframes

- Embedding untrusted third-party widgets.  
- Strong isolation from host styles/scripts.  
- Legacy apps that cannot be converted to module-based MFEs quickly.
