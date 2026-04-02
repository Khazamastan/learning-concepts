# Most Frequent Word

## Problem
Inspect a paragraph of text and report which word appears most often, ignoring
punctuation and casing.

## Solution
`mostFrequentWord` lowercases the input, strips non-alphanumeric characters, and
splits on whitespace. It tallies counts in an object and tracks the highest
count while iterating over the entries, returning both the winning word and its
frequency.

## Running locally
```
npm install
npm start
```
