# Audio Recorder in React

## Problem

Build a lightweight audio recorder that:

- Requests microphone permission.
- Provides start/stop/reset controls.
- Shows recording status.
- Lets users preview and download the captured clip.

## Solution

`AudioRecorder.jsx` wraps the MediaRecorder API. Core ideas:

- `requestStream` lazily asks for `getUserMedia({ audio: true })` and updates permission state.
- Starting a recording instantiates `MediaRecorder`, collects `dataavailable` chunks, and converts them into a Blob URL on stop.
- Object URLs are revoked when replaced to avoid memory leaks.
- The UI reflects state (`idle` vs `recording`) and disables buttons when actions are invalid.

If MediaRecorder is unsupported or permission is denied, the component surfaces friendly warnings.

## Running locally

```bash
cd build-an-audio-recorder-from-scratch-javascript-interview-question-react
npm install
npm run dev
```

Visit the Vite dev server (default `http://localhost:5173`). Grant microphone access when prompted, then record and download a clip.
