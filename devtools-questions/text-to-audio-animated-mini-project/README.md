# Text to Audio Animated Mini Project

## Problem
Create an interactive text-to-speech playground that uses the browser's Speech
Synthesis API. The experience should let users type a message, choose a voice,
and hear narration while a lightweight animation reflects the speaking state.
The UI must expose clear errors when the feature is unavailable or the input is
empty, and prevent overlapping utterances.

## Solution
This Vite + React build keeps track of the typed message, available voices, and
speech status in component state. On mount it populates the voice list through
`speechSynthesis.getVoices` and listens for the `voiceschanged` event to cover
delayed loading. The `handleSpeak` routine cancels any in-progress speech,
guards against empty input, wires lifecycle callbacks (`onstart`, `onend`,
`onerror`), and dispatches a new `SpeechSynthesisUtterance`. A simple visualizer
component maps the speaking state (`idle`, `playing`, `error`) to CSS
animations, giving users immediate feedback while the utterance plays.

## Running locally
```
npm install
npm run dev
```

> Requires a browser with Speech Synthesis support (Chrome, Edge, Safari, etc.).
