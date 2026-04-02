# Accordion component in React

## Problem

Build an accessible accordion that supports mouse and keyboard interaction, ensures only one panel is open at a time, and animates content expansion.

## Solution

The demo keeps the `openItem` id in state. Each `AccordionItem` button toggles its panel, using ARIA attributes (`aria-expanded`, `aria-controls`) and a focus-visible outline. A controlled max-height transition creates smooth open/close animations without external libraries.

## Running locally

```bash
cd implement-accordion-component-in-reactjs-javascript-interview-question
npm install
npm run dev
```

Visit the Vite URL (default `http://localhost:5173`) to interact with the component.
