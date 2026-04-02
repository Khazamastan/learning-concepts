// Greedy algorithm solutions with concise explanations.

/**
 * Problem: Two City Scheduling
 * Send n people to two cities minimizing cost.
 * Solution: Sort by cost difference and assign first half to city A, rest to city B (O(n log n)).
 */
export function twoCitySchedCost(costs) {
  costs.sort((a, b) => (a[0] - a[1]) - (b[0] - b[1]));
  const n = costs.length / 2;
  let total = 0;
  for (let i = 0; i < costs.length; i += 1) {
    total += i < n ? costs[i][0] : costs[i][1];
  }
  return total;
}

/**
 * Problem: Assign Cookies
 * Maximize content children by assigning cookies meeting GRE (size>=greed).
 * Solution: Sort greed and cookies, use two pointers (O(n log n)).
 */
export function findContentChildren(greed, cookies) {
  greed.sort((a, b) => a - b);
  cookies.sort((a, b) => a - b);
  let child = 0;
  for (const size of cookies) {
    if (child < greed.length && size >= greed[child]) child += 1;
  }
  return child;
}

/**
 * Problem: Lemonade Change
 * Determine if change can be provided for each customer paying $5, $10, or $20.
 * Solution: Track counts of $5 and $10; greedy change (O(n) time).
 */
export function lemonadeChange(bills) {
  let five = 0;
  let ten = 0;
  for (const bill of bills) {
    if (bill === 5) five += 1;
    else if (bill === 10) {
      if (five === 0) return false;
      five -= 1;
      ten += 1;
    } else {
      if (ten > 0 && five > 0) {
        ten -= 1;
        five -= 1;
      } else if (five >= 3) five -= 3;
      else return false;
    }
  }
  return true;
}

/**
 * Problem: Best Time to Buy and Sell Stock II
 * Maximize profit with multiple transactions.
 * Solution: Sum all positive price differences (O(n) time).
 */
export function maxProfitII(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i += 1) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }
  return profit;
}

/**
 * Problem: Insert Interval
 * Insert merging new interval into sorted disjoint intervals.
 * Solution: Traverse once, merging overlaps with new interval (O(n) time).
 */
export function insert(intervals, newInterval) {
  const result = [];
  let [start, end] = newInterval;
  let placed = false;
  for (const [s, e] of intervals) {
    if (e < start) result.push([s, e]);
    else if (end < s) {
      if (!placed) {
        result.push([start, end]);
        placed = true;
      }
      result.push([s, e]);
    } else {
      start = Math.min(start, s);
      end = Math.max(end, e);
    }
  }
  if (!placed) result.push([start, end]);
  return result;
}

/**
 * Problem: Merge Intervals
 * Merge overlapping intervals.
 * Solution: Sort by start and merge sequentially (O(n log n)).
 */
export function merge(intervals) {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const result = [intervals[0].slice()];
  for (let i = 1; i < intervals.length; i += 1) {
    const current = intervals[i];
    const last = result[result.length - 1];
    if (current[0] <= last[1]) last[1] = Math.max(last[1], current[1]);
    else result.push(current.slice());
  }
  return result;
}

/**
 * Problem: Partition Labels
 * Partition string so each letter appears in at most one part.
 * Solution: Track last occurrence and greedily cut when current index meets last seen (O(n)).
 */
export function partitionLabels(s) {
  const last = new Array(26).fill(-1);
  for (let i = 0; i < s.length; i += 1) last[s.charCodeAt(i) - 97] = i;
  const result = [];
  let start = 0;
  let end = 0;
  for (let i = 0; i < s.length; i += 1) {
    end = Math.max(end, last[s.charCodeAt(i) - 97]);
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }
  return result;
}

/**
 * Problem: Non-overlapping Intervals
 * Find minimum removals to eliminate overlaps.
 * Solution: Sort by end time and greedily keep intervals with earliest end (O(n log n)).
 */
export function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) return 0;
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 0;
  let prevEnd = intervals[0][1];
  for (let i = 1; i < intervals.length; i += 1) {
    if (intervals[i][0] < prevEnd) count += 1;
    else prevEnd = intervals[i][1];
  }
  return count;
}

/**
 * Problem: Task Scheduler
 * Given tasks with cooldown n, find least interval to finish.
 * Solution: Greedy using idle slot formula max(total, (maxFreq-1)*(n+1)+countMax).
 */
export function leastInterval(tasks, n) {
  const counts = new Array(26).fill(0);
  for (const task of tasks) counts[task.charCodeAt(0) - 65] += 1;
  counts.sort((a, b) => b - a);
  const maxFreq = counts[0];
  let maxCount = 0;
  for (const count of counts) {
    if (count === maxFreq) maxCount += 1;
    else break;
  }
  const partCount = maxFreq - 1;
  const partLength = n - (maxCount - 1);
  const emptySlots = partCount * Math.max(0, partLength);
  const availableTasks = tasks.length - maxFreq * maxCount;
  const idles = Math.max(0, emptySlots - availableTasks);
  return tasks.length + idles;
}

/**
 * Problem: Gas Station
 * Determine starting station to complete circuit or -1.
 * Solution: Greedy accumulate tank; reset when negative (O(n)).
 */
export function canCompleteCircuit(gas, cost) {
  let total = 0;
  let tank = 0;
  let start = 0;
  for (let i = 0; i < gas.length; i += 1) {
    const diff = gas[i] - cost[i];
    total += diff;
    tank += diff;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return total >= 0 ? start : -1;
}

/**
 * Problem: Car Pooling
 * Determine if capacity suffices given trips [passengers, start, end].
 * Solution: Sweep line difference array (O(n log n) due to sorting stops).
 */
export function carPooling(trips, capacity) {
  const events = [];
  for (const [passengers, start, end] of trips) {
    events.push([start, passengers]);
    events.push([end, -passengers]);
  }
  events.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  let current = 0;
  for (const [, change] of events) {
    current += change;
    if (current > capacity) return false;
  }
  return true;
}

/**
 * Problem: Candy
 * Distribute candies satisfying ratings (neighbors with higher rating get more).
 * Solution: Two-pass approach left-to-right and right-to-left (O(n) time).
 */
export function candy(ratings) {
  const n = ratings.length;
  const candies = new Array(n).fill(1);
  for (let i = 1; i < n; i += 1) {
    if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
  }
  for (let i = n - 2; i >= 0; i -= 1) {
    if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
  }
  return candies.reduce((sum, value) => sum + value, 0);
}
