class VNode {
  constructor(type) {
    this.type = type;
    this.children = [];
    this.parent = null;
    this.innerHTML = '';
  }

  appendChild(node) {
    node.parent = this;
    this.children.push(node);
    return node;
  }
}

export class VDocument {
  constructor() {
    this.root = new VNode('html');
  }

  createElement(type) {
    return new VNode(type);
  }

  appendChild(node) {
    this.root.appendChild(node);
  }

  render() {
    const lines = [];

    function walk(node, depth) {
      const indent = '  '.repeat(depth);
      lines.push(`${indent}<${node.type}>`);

      if (node.innerHTML) {
        const contentIndent = '  '.repeat(depth + 1);
        lines.push(`${contentIndent}${node.innerHTML}`);
      }

      node.children.forEach((child) => walk(child, depth + 1));
      lines.push(`${indent}</${node.type}>`);
    }

    walk(this.root, 0);
    return lines.join('\n');
  }
}
