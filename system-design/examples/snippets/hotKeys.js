module.exports = register => {
  register('hotKeys', () => {
    function detect(keys, threshold) {
      return keys.filter(key => key.requests > threshold);
    }
    return detect;
  }, 'Cache cluster spotting celebrity profile keys receiving disproportionate traffic.');
};
