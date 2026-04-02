# Explain the CSS box model

## Core concepts

Every element on the page is rendered as a rectangular box composed of:

1. **Content box** — where text, images, etc. live. Controlled by `width` and `height`.
2. **Padding** — transparent space surrounding the content. Adds breathing room between content and border.
3. **Border** — the line enclosing padding and content. Contributes to the element’s visual outline.
4. **Margin** — outermost layer that separates the element from neighbours. Margins collapse vertically for block elements.

The total rendered size (in the default `box-sizing: content-box` mode) is:

```
total width  = width + padding-left + padding-right + border-left + border-right
 total height = height + padding-top  + padding-bottom + border-top  + border-bottom
```

## Alternative sizing

With `box-sizing: border-box`, declared `width`/`height` include padding and border. This mode simplifies layouts because the total size stays constant when padding changes.

## Example

Open `example.html` to see the layers visualised. Use dev tools to toggle `box-sizing` and watch how total width is affected.
