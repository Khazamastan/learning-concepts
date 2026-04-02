module.exports = register => {
  register('designingTinyURL', () => {
    const store = new Map();
    const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    function shorten(longUrl) {
      let code = '';
      for (let i = 0; i < 6; i += 1) {
        code += alphabet[Math.floor(Math.random() * alphabet.length)];
      }
      store.set(code, longUrl);
      return code;
    }
    const expand = code => store.get(code) || null;
    return { shorten, expand };
  }, 'URL shortening service generating 6-character tokens backed by a key-value store.');
};
