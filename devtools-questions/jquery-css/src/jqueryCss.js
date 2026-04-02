export function css(element, property, value) {
  if (!element || !element.style) {
    throw new Error('Element must have a style object');
  }
  if (value === undefined) {
    return element.style[property];
  }
  element.style[property] = value;
  return element;
}
