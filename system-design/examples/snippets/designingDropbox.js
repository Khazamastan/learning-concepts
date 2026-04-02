module.exports = register => {
  register('designingDropbox', () => {
    const files = new Map();
    function upload(userId, path, chunks) {
      files.set(`${userId}:${path}`, { chunks, version: Date.now() });
      return { path, chunkCount: chunks.length };
    }
    function download(userId, path) {
      return files.get(`${userId}:${path}`);
    }
    return { upload, download };
  }, 'Cloud storage syncing user file chunks with version metadata.');
};
