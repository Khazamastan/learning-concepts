# DOM Renderer

## Problem
Render a lightweight virtual DOM description into real DOM nodes (or an HTML
string) without relying on a framework. The renderer should support functional
components, props, event handlers, and text nodes.

## Solution
`createDomNode` materialises a node recursively, treating function types as
components and mapping string children into text v-nodes. Element props are
applied with special cases for styles and event handlers, while `render` mounts
the result into a container. `renderToString` provides a server-friendly path by
serialising the tree with escaping helpers.

## Running locally
```
npm install
npm start
```
