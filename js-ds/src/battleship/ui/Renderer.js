const createCell = (x, y, onSelect) => {
  const cell = document.createElement('button');
  cell.className = 'bs-cell';
  cell.dataset.x = x;
  cell.dataset.y = y;
  cell.type = 'button';
  cell.addEventListener('click', () => onSelect({ x, y }));
  return cell;
};

const renderBoard = (container, boardState, { onCellSelect }) => {
  container.innerHTML = '';
  container.className = 'bs-board';
  for (let y = 0; y < boardState.size; y += 1) {
    for (let x = 0; x < boardState.size; x += 1) {
      const cell = createCell(x, y, onCellSelect);
      const key = `${x}:${y}`;
      if (boardState.attacks.has(key)) {
        const value = boardState.grid[y][x];
        cell.classList.add(value ? 'hit' : 'miss');
        cell.textContent = value ? 'X' : '•';
      }
      container.appendChild(cell);
    }
  }
};

const renderStatus = (el, statusText) => {
  if (!el) {
    return;
  }
  el.textContent = statusText;
};

module.exports = { renderBoard, renderStatus };
