# Prize Calculator

## Problem
Distribute a prize pool across participants proportional to their weights. The
utility should ignore invalid entries and return both percentage shares and
monetary amounts.

## Solution
`calculatePrizeDistribution` sanitises participant data, sums their weights, and
then maps each entry into a share by dividing weight by the total. It multiplies
the share by the prize pool (rounded to two decimals) and returns an array of
results without mutating the original input.

## Running locally
```
npm install
npm start
```
