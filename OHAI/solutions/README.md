# JavaScript Practice Examples

This folder contains standalone Node.js scripts that demonstrate solutions to common interview-style problems and JavaScript concepts. Each file can be executed independently.

## Prerequisites

- Node.js 18 or newer installed locally (`node --version` should print a version number).
- (Optional) A terminal opened at the repo root: `/Users/kbellamk/Workspace/learning/OHAI`.

If Node.js is not installed, download it from [https://nodejs.org](https://nodejs.org) or use a version manager such as `nvm`.

## Running an Example

1. Change into this directory:
   ```bash
   cd /Users/kbellamk/Workspace/learning/OHAI/solutions
   ```
2. Execute a script with Node.js:
   ```bash
   node copyTechniques.js
   ```

Each script prints its own demonstration output to the console. Replace `copyTechniques.js` with the file you want to run, such as:

- `groupAnagrams.js`
- `filterPolyfill.js`
- `objectDestructuring.js`
- `processLogsMaxSpan.js`
- `processLargeFileDownload.js`
- `nimSum.js`
- `stringToInteger.js`
- `stringPermutations.js`
- `longestSubstringNoRepeat.js`
- `previousIndexOccurrence.js`
- `stringSubsets.js`
- `useNotification.js`

## Notes

- `processLargeFileDownload.js` logs example usage for creating a REST endpoint that streams large files. To test the server, provide a real file path and uncomment the server/startup logic in your own script.
- `useNotification.js` demonstrates a minimal centralized toast store; in a UI framework you would wire the `subscribe` callback to render toast components.
- Some scripts (e.g., `stringPermutations.js`) log multiple results; feel free to tweak input values inside each file to explore different cases.
