const focusTargets = Array.from(document.querySelectorAll('[data-focus-visible-target="true"]'));
const supportsFocusVisible = CSS.supports('selector(:focus-visible)');

if (supportsFocusVisible === false) {
  focusTargets.forEach((element) => {
    element.addEventListener('focus', () => {
      element.dataset.originalLeft = String(element.style.left);
      element.style.left = '1.25rem';
    });
    element.addEventListener('blur', () => {
      element.style.left = element.dataset.originalLeft || '-9999px';
    });
  });
}

focusTargets.forEach((element) => {
  element.addEventListener('mousedown', () => {
    element.blur();
  });
});
