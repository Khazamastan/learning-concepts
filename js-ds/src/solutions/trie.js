/**
 * Title: Trie (Autocomplete)
 * Difficulty: Medium
 * Companies: Google, Amazon, Meta, Atlassian
 *
 * Problem Summary:
 * Implement a Trie with `insert`, `search`, and `startsWith` methods.
 *
 * Solution Explanation:
 * Each node maps characters to child nodes with a flag marking the end of a word.
 *
 * Approach Outline:
 * Use nested objects for nodes. Traverse/create nodes on insert, check end flag for search, and ensure prefix traversal for startsWith.
 *
 * Complexity:
 *   Time: O(m) per op
 *   Space: O(n·m)
 *
 * Tests:
 *   - const trie = new Trie(); trie.insert("apple");
 *   - assert.strictEqual(trie.search("apple"), true);
 *   - assert.strictEqual(trie.search("app"), false);
 *   - assert.strictEqual(trie.startsWith("app"), true);
 *   - trie.insert("app");
 *   - assert.strictEqual(trie.search("app"), true);
 */

class TrieNode {
  constructor() {
    this.children = Object.create(null);
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.end = true;
  }

  search(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.end;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }
}

module.exports = { Trie };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const trie = new Trie(); trie.insert("apple");
  assert.strictEqual(trie.search("apple"), true);
  assert.strictEqual(trie.search("app"), false);
  assert.strictEqual(trie.startsWith("app"), true);
  trie.insert("app");
  assert.strictEqual(trie.search("app"), true);
  console.log('All tests passed for Trie (Autocomplete).');
}
