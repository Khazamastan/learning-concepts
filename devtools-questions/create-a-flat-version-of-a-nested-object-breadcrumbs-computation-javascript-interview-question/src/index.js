export function flattenObject(input, prefix = '', target = {}) {
  Object.entries(input).forEach(([key, value]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    const isPlainObject = value && typeof value === 'object' && Array.isArray(value) === false;
    if (isPlainObject) {
      flattenObject(value, path, target);
    } else {
      target[path] = value;
    }
  });
  return target;
}

const nested = {
  seo: {
    title: 'Create breadcrumbs',
    meta: {
      description: 'Example metadata',
      robots: 'index,follow',
    },
  },
  ui: {
    header: { label: 'Home', link: '/' },
    trail: [
      { label: 'Guides', link: '/guides' },
      { label: 'JS', link: '/guides/js' },
    ],
  },
};

console.log(flattenObject(nested));
