"use strict";

const React = require("react");

/**
 * Simple iframe wrapper that forwards sandbox and allow props.
 */
function EmbeddedFrame({
  src,
  title,
  height = 600,
  width = "100%",
  allow = "fullscreen",
  sandbox = "allow-scripts allow-same-origin",
}) {
  return (
    <iframe
      src={src}
      title={title}
      style={{ border: 0, width, height }}
      allow={allow}
      sandbox={sandbox}
    />
  );
}

/**
 * Helper to post structured data to an iframe (requires ref to the element).
 *
 * @param {HTMLIFrameElement|null} iframe
 * @param {unknown} payload
 * @param {string} targetOrigin
 */
function postToIframe(iframe, payload, targetOrigin = "*") {
  if (!(iframe instanceof HTMLIFrameElement)) {
    throw new Error("A valid iframe element is required");
  }
  iframe.contentWindow?.postMessage(payload, targetOrigin);
}

module.exports = { EmbeddedFrame, postToIframe };
