# Shared Metadata Bug Demo

## Problem
Given the supplied snippet, determine what happens to the original object when `duplicate` copies a post and edits `copy.metadata.title`.

## Solution
`duplicate` copies the reference to the nested `metadata` object (`metadata: post.metadata`). When the copy's metadata title is updated, the original post's title changes too because both objects share the same reference. The console output shows both titles mutated. To fix the bug, clone the nested object (`metadata: { ...post.metadata }`) or perform a deep clone before mutation.

## Running
```
node src/index.js
```
