/**
 * Title: Virtual DOM diff (basic)
 * Difficulty: Hard
 * Companies: Meta, Google, Atlassian
 *
 * Problem Summary:
 * Implement minimal virtual DOM utilities: `createElement`, `render`, and a basic `diff` helper that detects changes.
 *
 * Solution Explanation:
 * Virtual nodes are plain objects. Rendering walks the tree and creates DOM elements. The diff helper compares two trees and reports structural differences.
 *
 * Approach Outline:
 * `createElement` builds the vnode object; `render` recursively creates DOM nodes; `diff` compares node type/props/children and returns a list of changes.
 *
 * Complexity:
 *   Time: O(n)
 *   Space: O(n)
 *
 * Tests:
 *   - const vnode = createElement('div', { id: 'root' }, 'Hello');
 *   - assert.deepStrictEqual(vnode, { type: 'div', props: { id: 'root' }, children: ['Hello'] });
 *   - const patches = diff(createElement('p', {}, 'Hi'), createElement('p', {}, 'Hello'));
 *   - assert.ok(patches.some((patch) => patch.type === 'TEXT'));
 *   - if (typeof document !== 'undefined') { const container = document.createElement('div'); render(vnode, container); assert.strictEqual(container.firstChild.tagName, 'DIV'); }
 */

function createElement(type, props = {}, ...children) {
  return { type, props, children: children.flat() };
}

function render(vnode, container) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    container.appendChild(document.createTextNode(String(vnode)));
    return;
  }
  const el = document.createElement(vnode.type);
  Object.entries(vnode.props || {}).forEach(([key, value]) => {
    if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  });
  for (const child of vnode.children || []) {
    render(child, el);
  }
  container.appendChild(el);
}

function diff(oldVNode, newVNode, patches = []) {
  if (!oldVNode) {
    patches.push({ type: 'CREATE', node: newVNode });
  } else if (!newVNode) {
    patches.push({ type: 'REMOVE', node: oldVNode });
  } else if (oldVNode.type !== newVNode.type || typeof oldVNode !== typeof newVNode) {
    patches.push({ type: 'REPLACE', node: newVNode });
  } else if (typeof newVNode !== 'string' && typeof newVNode !== 'number') {
    const oldProps = oldVNode.props || {};
    const newProps = newVNode.props || {};
    for (const key of new Set([...Object.keys(oldProps), ...Object.keys(newProps)])) {
      if (oldProps[key] !== newProps[key]) {
        patches.push({ type: 'PROP', key, value: newProps[key] });
      }
    }
    const length = Math.max(oldVNode.children.length, newVNode.children.length);
    for (let i = 0; i < length; i += 1) {
      diff(oldVNode.children[i], newVNode.children[i], patches);
    }
  } else if (oldVNode !== newVNode) {
    patches.push({ type: 'TEXT', value: newVNode });
  }
  return patches;
}

module.exports = { createElement, render, diff };

if (require.main === module) {
  const assert = require('node:assert/strict');
  const vnode = createElement('div', { id: 'root' }, 'Hello');
  assert.deepStrictEqual(vnode, { type: 'div', props: { id: 'root' }, children: ['Hello'] });
  const patches = diff(createElement('p', {}, 'Hi'), createElement('p', {}, 'Hello'));
  assert.ok(patches.some((patch) => patch.type === 'TEXT'));
  if (typeof document !== 'undefined') { const container = document.createElement('div'); render(vnode, container); assert.strictEqual(container.firstChild.tagName, 'DIV'); }
  console.log('All tests passed for Virtual DOM diff (basic).');
}
