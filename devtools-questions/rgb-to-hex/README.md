# RGB To Hex

## Problem
Convert RGB channel values into a six-character hexadecimal colour string,
clamping channel inputs to the 0–255 range.

## Solution
`rgbToHex` normalises each channel via a small `clamp` helper, converts the
number to base 16, pads with zeros, and concatenates the parts. The output is
uppercased for readability and mirrors typical colour utility behaviour.

## Running locally
```
npm install
npm start
```
