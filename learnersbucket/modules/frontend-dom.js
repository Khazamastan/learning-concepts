import { debounce } from './timing-events-sdk.js';

/**
 * Problem: Capture product visible on viewport when user stops scrolling (Vanilla JS).
 * Example:
 *   const stop = setupVisibleProductsTracker('.product', 200, ids => console.log(ids));
 */
export function setupVisibleProductsTracker(selector, wait = 200, onUpdate = () => {}) {
  const products = () => [...document.querySelectorAll(selector)];

  function getVisibleIds() {
    return products()
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      })
      .map((el) => el.dataset.id || el.id || null)
      .filter(Boolean);
  }

  const onScrollStop = debounce(() => onUpdate(getVisibleIds()), wait);
  window.addEventListener('scroll', onScrollStop);

  return () => window.removeEventListener('scroll', onScrollStop);
}

/**
 * Problem: Image comparison slider.
 * Required DOM structure:
 *   root -> .overlay + input[type='range']
 */
export function setupImageComparisonSlider(root) {
  const overlay = root.querySelector('.overlay');
  const slider = root.querySelector("input[type='range']");
  if (!overlay || !slider) return;

  function update(value) {
    overlay.style.width = `${value}%`;
  }

  slider.addEventListener('input', (e) => update(e.target.value));
  update(slider.value || 50);
}

/**
 * Problem: Responsive slideshow gallery.
 */
export function createSlideshow(images = []) {
  let index = 0;

  return {
    current() {
      return images[index] ?? null;
    },
    next() {
      if (!images.length) return null;
      index = (index + 1) % images.length;
      return images[index];
    },
    prev() {
      if (!images.length) return null;
      index = (index - 1 + images.length) % images.length;
      return images[index];
    }
  };
}

/**
 * Problem: Create a lightbox (Modal-Image-gallery).
 * Required DOM:
 *   modalRoot contains <img>, and close/next/prev handlers can call returned functions.
 */
export function createLightbox(images, modalRoot, imgNode) {
  let index = 0;

  function render() {
    imgNode.src = images[index];
  }

  return {
    open(start = 0) {
      index = start;
      render();
      modalRoot.style.display = 'block';
    },
    close() {
      modalRoot.style.display = 'none';
    },
    next() {
      index = (index + 1) % images.length;
      render();
    },
    prev() {
      index = (index - 1 + images.length) % images.length;
      render();
    }
  };
}

/**
 * Problem: Animate elements in sequence.
 * Example: animateInOrder(document.querySelectorAll('.box'), 300)
 */
export function animateInOrder(elements, delay = 300, className = 'show') {
  [...elements].forEach((el, i) => {
    setTimeout(() => el.classList.add(className), i * delay);
  });
}

/**
 * Problem: Preview zoomed image on hover.
 */
export function setupZoomPreview(imageNode, zoomNode) {
  imageNode.addEventListener('mousemove', (e) => {
    const rect = imageNode.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    zoomNode.style.backgroundImage = `url(${imageNode.src})`;
    zoomNode.style.backgroundPosition = `${x}% ${y}%`;
    zoomNode.style.display = 'block';
  });

  imageNode.addEventListener('mouseleave', () => {
    zoomNode.style.display = 'none';
  });
}

/**
 * Problem: Preview selected color from swatches.
 */
export function setupColorSwatches(swatches, previewNode) {
  [...swatches].forEach((el) => {
    el.addEventListener('click', () => {
      const color = el.dataset.color;
      previewNode.style.background = color;
      previewNode.textContent = color;
    });
  });
}
