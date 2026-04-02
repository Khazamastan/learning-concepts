const display = document.getElementById('display');
const keys = document.querySelector('.keys');

let buffer = '0';

const updateDisplay = () => {
  display.value = buffer;
};

const appendValue = (value) => {
  if (buffer === '0' && value !== '.') {
    buffer = value;
  } else {
    buffer += value;
  }
  updateDisplay();
};

const evaluateExpression = () => {
  try {
    const result = Function(`"use strict"; return (${buffer})`)();
    buffer = Number.isFinite(result) ? String(result) : 'Error';
  } catch (error) {
    buffer = 'Error';
  }
  updateDisplay();
};

keys.addEventListener('click', (event) => {
  const target = event.target;
  if (!target.matches('button')) {
    return;
  }

  const { action, value } = target.dataset;

  if (action === 'clear') {
    buffer = '0';
    updateDisplay();
    return;
  }

  if (action === 'delete') {
    buffer = buffer.length > 1 ? buffer.slice(0, -1) : '0';
    updateDisplay();
    return;
  }

  if (action === 'evaluate') {
    evaluateExpression();
    return;
  }

  if (value) {
    if (buffer === 'Error') {
      buffer = '0';
    }
    if (value === '.' && buffer.endsWith('.')) {
      return;
    }
    appendValue(value);
  }
});

updateDisplay();
