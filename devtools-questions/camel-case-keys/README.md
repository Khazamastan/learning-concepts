# Camel Case Keys

## Problem
Transform all object keys to camelCase, including nested objects and arrays, so
that API responses with snake_case or kebab-case properties become more
JavaScript-friendly.

## Solution
The `camelCaseKeys` function recurses through arrays and plain objects. It uses
a small `toCamelCase` helper that splits keys on underscores, hyphens, or spaces
and recombines them in camelCase form. Primitive values pass through untouched,
making the utility safe for arbitrarily deep data structures.

## Running locally
```
npm install
npm start
```
