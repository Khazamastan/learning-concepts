import { forwardRef, useRef } from "react";

const EmbedFrame = forwardRef(function EmbedFrame(
  {
    src,
    title,
    allow = "fullscreen",
    sandbox = "allow-scripts allow-same-origin",
    height = 480,
    width = "100%",
  },
  ref
) {
  const innerRef = useRef(null);

  return (
    <iframe
      ref={(node) => {
        innerRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      src={src}
      title={title}
      allow={allow}
      sandbox={sandbox}
      style={{ border: 0, width, height }}
    />
  );
});

export function postToIframe(iframe, payload, targetOrigin = "*") {
  if (!(iframe instanceof HTMLIFrameElement)) {
    throw new Error("postToIframe expects a valid HTMLIFrameElement");
  }
  iframe.contentWindow?.postMessage(payload, targetOrigin);
}

export default EmbedFrame;
