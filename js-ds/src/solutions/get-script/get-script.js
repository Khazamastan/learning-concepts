/**
 * Title: getScript
 * Difficulty: Easy
 * Companies: Multiple front-end code bases
 *
 * Problem Summary:
 * Implement a `getScript(url, options?)` utility that downloads a remote JavaScript file
 * and executes it in the current browser context.
 *
 * Solution Explanation:
 * Fetch the script source via the Fetch API, then inject it into the document by creating
 * a `<script>` element with the downloaded code as its text content. Appending the element
 * to the document executes it in the global scope. Clean up the injected node afterward.
 *
 * Approach Outline:
 * 1. Validate the browser environment and the provided URL.
 * 2. Optionally apply cache-busting and pass through fetch options.
 * 3. Fetch the script text, construct a temporary inline `<script>` element, and execute it.
 * 4. Resolve when execution finishes, reject on failures.
 *
 * Complexity:
 *   Time: O(n) where n is the size of the script (dominant cost is reading the response body).
 *   Space: O(n) to hold the fetched script text prior to injection.
 */

/**
 * Fetches and executes a JavaScript file in the browser.
 *
 * @param {string} url - Absolute or relative URL pointing to the JavaScript resource.
 * @param {Object} [options]
 * @param {boolean} [options.cacheBust=false] - When true, append a timestamp query param to avoid caches.
 * @param {RequestInit} [options.fetchOptions] - Additional options for the fetch call.
 * @param {Record<string, string>} [options.attributes] - Extra attributes to assign to the created script tag.
 * @returns {Promise<HTMLScriptElement>} Resolves with the injected script element once executed.
 */
export function getScript(url, options = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.reject(new Error('getScript requires a browser-like environment with window and document.'));
  }
  if (typeof url !== 'string' || url.trim().length === 0) {
    return Promise.reject(new TypeError('getScript expected a non-empty URL string.'));
  }

  const {
    cacheBust = false,
    fetchOptions = {},
    attributes = {},
  } = options;

  let resolvedUrl;
  try {
    const base = window.location?.href ?? document.baseURI ?? undefined;
    resolvedUrl = new URL(url, base).toString();
  } catch {
    return Promise.reject(new TypeError('getScript could not resolve the provided URL.'));
  }

  const finalUrl = cacheBust
    ? `${resolvedUrl}${resolvedUrl.includes('?') ? '&' : '?'}_=${Date.now()}`
    : resolvedUrl;

  return fetch(finalUrl, fetchOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load script (${response.status} ${response.statusText}) from ${resolvedUrl}.`);
      }
      return response.text();
    })
    .then((code) => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';

      Object.entries(attributes).forEach(([key, value]) => {
        if (value != null) script.setAttribute(key, String(value));
      });

      try {
        const scheduleMicrotask = typeof queueMicrotask === 'function'
          ? queueMicrotask
          : (cb) => Promise.resolve().then(cb);
        // Adding a sourceURL comment preserves stack traces in dev tools.
        const sourceAnnotated = `${code}\n//# sourceURL=${resolvedUrl}`;
        script.text = sourceAnnotated;
        script.onload = () => {
          script.remove();
          resolve(script);
        };
        script.onerror = (event) => {
          script.remove();
          reject(new Error(`Executing script from ${resolvedUrl} threw an error.`));
        };
        document.head.appendChild(script);

        // Inline scripts may not fire onload in some browsers; resolve on next microtask.
        if (!script.src) {
          scheduleMicrotask(() => {
            if (document.contains(script)) script.remove();
            resolve(script);
          });
        }
      } catch (error) {
        script.remove();
        reject(error);
      }
    }));
}