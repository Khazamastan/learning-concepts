const bindControls = ({
  rotateBtn,
  readyBtn,
  statusEl,
  onRotate,
  onReady,
}) => {
  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      onRotate();
      if (statusEl) {
        statusEl.textContent = 'Placement orientation toggled.';
      }
    });
  }
  if (readyBtn) {
    readyBtn.addEventListener('click', () => {
      onReady();
    });
  }
};

module.exports = { bindControls };
