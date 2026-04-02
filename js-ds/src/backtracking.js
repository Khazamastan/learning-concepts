// Backtracking solutions for combinatorial search problems.

/**
 * Problem: Subsets (Power Set)
 * Generate all possible subsets of nums.
 * Solution: DFS exploring include/exclude (O(2^n)).
 */
export function subsets(nums) {
  const result = [];
  const path = [];
  const dfs = (index) => {
    if (index === nums.length) {
      result.push([...path]);
      return;
    }
    path.push(nums[index]);
    dfs(index + 1);
    path.pop();
    dfs(index + 1);
  };
  dfs(0);
  return result;
}

/**
 * Problem: Combinations
 * Return all combinations of k numbers from 1..n.
 * Solution: Backtracking with pruning when remaining numbers insufficient.
 */
export function combine(n, k) {
  const result = [];
  const path = [];
  const dfs = (start) => {
    if (path.length === k) {
      result.push([...path]);
      return;
    }
    for (let i = start; i <= n - (k - path.length) + 1; i += 1) {
      path.push(i);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(1);
  return result;
}

/**
 * Problem: Permutations
 * Return all permutations of nums.
 * Solution: Backtracking swapping or using visited set (O(n! * n)).
 */
export function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  const path = [];
  const dfs = () => {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  };
  dfs();
  return result;
}

/**
 * Problem: Subsets II
 * Return all unique subsets where nums may contain duplicates.
 * Solution: Sort and skip duplicates at same recursion depth.
 */
export function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  const path = [];
  const dfs = (index) => {
    result.push([...path]);
    for (let i = index; i < nums.length; i += 1) {
      if (i > index && nums[i] === nums[i - 1]) continue;
      path.push(nums[i]);
      dfs(i + 1);
      path.pop();
    }
  };
  dfs(0);
  return result;
}

/**
 * Problem: Combination Sum
 * Find all combinations where candidates can be reused to sum to target.
 * Solution: DFS exploring candidates with non-decreasing indices (O(2^n)).
 */
export function combinationSum(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];
  const path = [];
  const dfs = (start, remain) => {
    if (remain === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length && candidates[i] <= remain; i += 1) {
      path.push(candidates[i]);
      dfs(i, remain - candidates[i]);
      path.pop();
    }
  };
  dfs(0, target);
  return result;
}

/**
 * Problem: Combination Sum II
 * Each candidate used at most once.
 * Solution: Sort and skip duplicates; advance index when recursing (O(2^n)).
 */
export function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];
  const path = [];
  const dfs = (start, remain) => {
    if (remain === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length && candidates[i] <= remain; i += 1) {
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      path.push(candidates[i]);
      dfs(i + 1, remain - candidates[i]);
      path.pop();
    }
  };
  dfs(0, target);
  return result;
}

/**
 * Problem: Combination Sum III
 * Choose k numbers from 1..9 sum to n.
 * Solution: Backtracking with pruning on sum and remaining count.
 */
export function combinationSum3(k, n) {
  const result = [];
  const path = [];
  const dfs = (start, remain) => {
    if (path.length === k) {
      if (remain === 0) result.push([...path]);
      return;
    }
    for (let i = start; i <= 9 && i <= remain; i += 1) {
      path.push(i);
      dfs(i + 1, remain - i);
      path.pop();
    }
  };
  dfs(1, n);
  return result;
}

/**
 * Problem: Letter Combinations of a Phone Number
 * Map digits to letters and return all combinations.
 * Solution: DFS building characters per digit (O(4^n)).
 */
export function letterCombinations(digits) {
  if (!digits) return [];
  const map = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz',
  };
  const result = [];
  const path = [];
  const dfs = (index) => {
    if (index === digits.length) {
      result.push(path.join(''));
      return;
    }
    for (const ch of map[digits[index]]) {
      path.push(ch);
      dfs(index + 1);
      path.pop();
    }
  };
  dfs(0);
  return result;
}

/**
 * Problem: Permutations II
 * Return unique permutations when nums contains duplicates.
 * Solution: Sort and skip used duplicates when previous identical hasn't been used.
 */
export function permuteUnique(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  const used = new Array(nums.length).fill(false);
  const path = [];
  const dfs = () => {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) continue;
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;
      used[i] = true;
      path.push(nums[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  };
  dfs();
  return result;
}

/**
 * Problem: Palindrome Partitioning
 * Partition string into palindromic substrings.
 * Solution: Backtracking with precomputed palindrome check (O(n * 2^n)).
 */
export function partition(s) {
  const result = [];
  const path = [];
  const isPal = (l, r) => {
    while (l < r) {
      if (s[l] !== s[r]) return false;
      l += 1;
      r -= 1;
    }
    return true;
  };
  const dfs = (start) => {
    if (start === s.length) {
      result.push([...path]);
      return;
    }
    for (let end = start; end < s.length; end += 1) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1));
        dfs(end + 1);
        path.pop();
      }
    }
  };
  dfs(0);
  return result;
}

/**
 * Problem: Word Search
 * Determine if word exists in board by adjacent letters.
 * Solution: DFS with visited markers, exploring neighbors (O(mn * 4^L)).
 */
export function exist(board, word) {
  const rows = board.length;
  const cols = board[0]?.length ?? 0;
  const visited = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const dfs = (r, c, index) => {
    if (index === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (visited[r][c] || board[r][c] !== word[index]) return false;
    visited[r][c] = true;
    for (const [dr, dc] of dirs) {
      if (dfs(r + dr, c + dc, index + 1)) return true;
    }
    visited[r][c] = false;
    return false;
  };
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}

/**
 * Problem: N Queens
 * Return all distinct solutions to n-queens puzzle.
 * Solution: Backtracking with column and diagonal occupancy sets (O(n!)).
 */
export function solveNQueens(n) {
  const result = [];
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  const board = Array.from({ length: n }, () => '.'.repeat(n).split(''));
  const dfs = (row) => {
    if (row === n) {
      result.push(board.map((rowArr) => rowArr.join('')));
      return;
    }
    for (let col = 0; col < n; col += 1) {
      const d1 = row - col;
      const d2 = row + col;
      if (cols.has(col) || diag1.has(d1) || diag2.has(d2)) continue;
      cols.add(col);
      diag1.add(d1);
      diag2.add(d2);
      board[row][col] = 'Q';
      dfs(row + 1);
      board[row][col] = '.';
      cols.delete(col);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  };
  dfs(0);
  return result;
}
