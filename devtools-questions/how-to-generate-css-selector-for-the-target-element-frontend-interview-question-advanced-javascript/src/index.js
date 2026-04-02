class ElementNode {
  constructor({ tag, id = "", classes = [] }) {
    this.tagName = tag.toLowerCase();
    this.id = id;
    this.classes = [...classes];
    this.children = [];
    this.parentElement = null;
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
  }
}

function cssSelector(node) {
  if (!node || !node.tagName) throw new TypeError("Expected an element node");
  const parts = [];
  let current = node;
  while (current) {
    let selector = current.tagName;
    if (current.id) {
      selector += `#${current.id}`;
      parts.unshift(selector);
      break; // IDs are unique; no need to continue upward for uniqueness
    }
    if (current.classes.length) {
      selector += current.classes.map((cls) => `.${cls}`).join("");
    }
    const index = siblingIndex(current);
    if (index > 1) {
      selector += `:nth-of-type(${index})`;
    }
    parts.unshift(selector);
    current = current.parentElement;
  }
  return parts.join(" > ");
}

function siblingIndex(node) {
  if (!node.parentElement) return 1;
  const siblings = node.parentElement.children.filter((child) => child.tagName === node.tagName);
  return siblings.indexOf(node) + 1;
}

// demo tree
const root = new ElementNode({ tag: "main", id: "content" });
const section = new ElementNode({ tag: "section", classes: ["feature" ] });
const list = new ElementNode({ tag: "ul", classes: ["product-list"] });
const itemA = new ElementNode({ tag: "li", classes: ["product"] });
const itemB = new ElementNode({ tag: "li", classes: ["product", "featured"] });
const button = new ElementNode({ tag: "button", classes: ["buy"] });

root.appendChild(section);
section.appendChild(list);
list.appendChild(itemA);
list.appendChild(itemB);
itemB.appendChild(button);

console.log(cssSelector(button));
console.log(cssSelector(itemA));
