const input = document.getElementById('query');
const list = document.getElementById('suggestions');
let activeIndex = -1;
let controller = null;
let debounceId = null;

function clearSuggestions() {
  list.innerHTML = '';
  list.setAttribute('aria-hidden', 'true');
  input.setAttribute('aria-activedescendant', '');
  activeIndex = -1;
}

function renderOptions(names) {
  list.innerHTML = '';
  if (names.length === 0) {
    clearSuggestions();
    return;
  }

  names.forEach((name, index) => {
    const li = document.createElement('li');
    li.id = 'option-' + index;
    li.role = 'option';
    li.textContent = name;
    li.tabIndex = -1;
    li.addEventListener('mousedown', () => {
      commitSelection(name);
    });
    list.appendChild(li);
  });

  list.setAttribute('aria-hidden', 'false');
}

async function fetchNames(term) {
  if (term.length === 0) {
    clearSuggestions();
    return;
  }

  if (controller) controller.abort();
  controller = new AbortController();
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', {
      signal: controller.signal
    });
    const data = await response.json();
    const filtered = data.results
      .map(({ name }) => name)
      .filter((name) => name.startsWith(term.toLowerCase()))
      .slice(0, 10);
    renderOptions(filtered);
  } catch (error) {
    if (error.name !== 'AbortError') {
      console.error('Autocomplete failed', error);
      clearSuggestions();
    }
  }
}

function commitSelection(value) {
  input.value = value;
  clearSuggestions();
}

input.addEventListener('input', (event) => {
  if (debounceId) window.clearTimeout(debounceId);
  const term = event.target.value.trim();
  debounceId = window.setTimeout(() => fetchNames(term), 200);
});

input.addEventListener('keydown', (event) => {
  const options = Array.from(list.children);
  if (options.length === 0) return;

  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, options.length - 1);
      break;
    case 'ArrowUp':
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      break;
    case 'Enter':
      if (activeIndex >= 0) {
        event.preventDefault();
        commitSelection(options[activeIndex].textContent);
      }
      return;
    case 'Escape':
      clearSuggestions();
      return;
    default:
      return;
  }

  options.forEach((option, index) => {
    option.setAttribute('aria-selected', String(index === activeIndex));
  });

  if (activeIndex >= 0) {
    const option = options[activeIndex];
    input.setAttribute('aria-activedescendant', option.id);
    option.scrollIntoView({ block: 'nearest' });
  }
});

document.addEventListener('click', (event) => {
  if (event.target.closest('.search') === null) {
    clearSuggestions();
  }
});
