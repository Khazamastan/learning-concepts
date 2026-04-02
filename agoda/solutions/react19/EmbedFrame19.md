# Embed Frame (React 19)

- Wraps `<iframe>` with React-friendly defaults, forwarding refs for integrations.  
- Exposes `postToIframe` utility for structured messaging.  
- Pairs well with form actions or transitions when embedding dashboards.

## Usage

```jsx
import { useRef } from "react";
import EmbedFrame, { postToIframe } from "./solutions/react19/EmbedFrame19.jsx";

export default function FrameDemo() {
  const iframeRef = useRef(null);

  return (
    <>
      <EmbedFrame ref={iframeRef} src="https://example.com" title="Remote content" />
      <button onClick={() => postToIframe(iframeRef.current, { type: "ping" }, "https://example.com")}>
        Ping iframe
      </button>
    </>
  );
}
```

## React 19 Notes

- Works with the upcoming ref-as-prop improvements; until then, `forwardRef` keeps compatibility.  
- Combine with `useActionState` or `useOptimistic` if you need to coordinate actions affecting the iframe.
