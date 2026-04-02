module.exports = register => {
  register('objectStorage', () => {
    const objects = new Map();
    function putObject(key, metadata) {
      objects.set(key, { metadata, createdAt: Date.now() });
    }
    function getObject(key) {
      return objects.get(key) || null;
    }
    return { putObject, getObject };
  }, 'Product media service storing JSON descriptions alongside image pointers.');
};
