module.exports = register => {
  register('blobStorage', () => {
    const blobs = new Map();
    function putBlob(key, buffer) {
      blobs.set(key, { size: buffer.length, buffer });
    }
    return { putBlob, getBlob: key => blobs.get(key) };
  }, 'Video sharing platform storing uploaded MP4 chunks for transcoding.');
};
