/**
 * Convert a lightweight virtual DOM node into a real DOM node.
 * @param {{ type: string | Function, props?: Record<string, unknown>, children?: any[] }} vNode
 * @param {Document} [doc=document]
 * @returns {Node}
 */
export function createDomNode(vNode, doc = globalThis.document) {
  if (!vNode || typeof vNode !== 'object') {
    throw new TypeError('Expected a virtual node object.');
  }

  const { type, props = {}, children = [] } = vNode;

  if (typeof type === 'function') {
    return createDomNode(type(props), doc);
  }

  if (!doc) {
    throw new Error('A Document instance is required to materialize the node.');
  }

  const node = type === 'text'
    ? doc.createTextNode(props.nodeValue ?? '')
    : doc.createElement(type);

  if (node.nodeType === Node.ELEMENT_NODE) {
    applyProps(node, props);
    children.map((child) =>
      typeof child === 'string' ? { type: 'text', props: { nodeValue: child } } : child,
    ).forEach((child) => {
      node.appendChild(createDomNode(child, doc));
    });
  }

  return node;
}

/**
 * Attach the rendered DOM node to a host container.
 * @param {{ type: string | Function, props?: Record<string, unknown>, children?: any[] }} vNode
 * @param {Element} container
 */
export function render(vNode, container) {
  if (!container) {
    throw new Error('A host container element is required.');
  }

  const node = createDomNode(vNode, container.ownerDocument);
  container.innerHTML = '';
  container.appendChild(node);
}

/**
 * Render the virtual DOM tree to an HTML string. Works in Node.js without a DOM.
 * @param {{ type: string | Function, props?: Record<string, unknown>, children?: any[] } | string} vNode
 * @returns {string}
 */
export function renderToString(vNode) {
  if (typeof vNode === 'string') {
    return escapeHtml(vNode);
  }

  const { type, props = {}, children = [] } = vNode;
  if (type === 'text') {
    return escapeHtml(props.nodeValue ?? '');
  }

  const attributes = Object.entries(props)
    .filter(([key]) => key !== 'children' && key !== 'nodeValue')
    .map(([key, value]) => {
      if (key === 'style' && value && typeof value === 'object') {
        const styleText = Object.entries(value)
          .map(([prop, propValue]) => `${kebabCase(prop)}:${propValue}`)
          .join(';');
        return `style="${escapeAttribute(styleText)}"`;
      }
      if (value === true) {
        return key;
      }
      if (value === false || value == null) {
        return null;
      }
      return `${key}="${escapeAttribute(String(value))}"`;
    })
    .filter(Boolean)
    .join(' ');

  const openingTag = attributes ? `<${type} ${attributes}>` : `<${type}>`;
  const content = children
    .map((child) => (typeof child === 'string' ? child : renderToString(child)))
    .join('');

  return `${openingTag}${content}</${type}>`;
}

function applyProps(node, props) {
  Object.entries(props).forEach(([key, value]) => {
    if (key === 'style' && value && typeof value === 'object') {
      Object.assign(node.style, value);
      return;
    }
    if (key.startsWith('on') && typeof value === 'function') {
      node.addEventListener(key.slice(2).toLowerCase(), value);
      return;
    }
    if (key === 'children' || key === 'nodeValue') {
      return;
    }
    if (value === true) {
      node.setAttribute(key, '');
      return;
    }
    if (value === false || value == null) {
      node.removeAttribute(key);
      return;
    }
    node.setAttribute(key, value);
  });
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (match) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[match]);
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function kebabCase(value) {
  return value.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}
