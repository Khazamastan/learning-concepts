# Build a Dictionary App (React)

## Problem
Create a lightweight dictionary application that:

- Lets users search for an English word.
- Fetches definitions, phonetics, and synonyms from a public API.
- Handles loading and error states elegantly.
- Provides a responsive, polished interface with quick synonym lookup.

## Solution
The React + Vite app queries the free Dictionary API (`dictionaryapi.dev`) on
search submit. Hook state tracks the active term, loading/error status, and API
response. Results display the primary entry’s phonetic spelling, up to three
definitions per part of speech, example sentences, and synonym chips that can be
clicked to trigger a new lookup. Styling delivers a dark neon UI with responsive
layouts for mobile.

## Running locally
```
npm install
npm run dev
```
