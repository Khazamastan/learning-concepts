# Create a dictionary of dates

## Problem

Convert a list of events into an object keyed by UTC date (`YYYY-MM-DD`), with each value being the array of events on that calendar day.

## Solution

`createDateDictionary` iterates through the events with `reduce`, normalising each timestamp via `toISOString().slice(0, 10)` to handle time zones. If a bucket for the date does not exist, it creates one, then pushes the event into the bucket.

## Running locally

```bash
cd create-a-dictionary-of-dates-frontend-interview-questions-problem-solving-practice
node src/index.js
```

The demo prints the grouped object for sample data.
