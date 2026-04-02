# Implement a Developer Builder Interface

## Problem
Design a fluent builder API that helps construct `Developer` objects with
multiple optional attributes—name, stack, years of experience, skills, and
availability—without forcing callers to pass all properties up front. The
builder should allow chaining and provide a `build()` method that returns an
immutable snapshot.

## Solution
`DeveloperBuilder` keeps the current configuration in private state and offers
chainable setters (`setName`, `setPrimaryStack`, `addSkill`, etc.). Calling
`build()` creates a new `Developer` instance, converts the internal `Set` of
skills into an array, and resets the builder so it can be reused safely. The
demo constructs two developers back-to-back, showing that state does not leak
between builds.

## Running locally
```
npm install
npm start
```
