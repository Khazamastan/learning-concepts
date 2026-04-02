module.exports = register => {
  register('designingYouTube', () => {
    const videos = new Map();
    function uploadVideo({ videoId, uploaderId, sourceSizeMb }) {
      const transcodedVariants = ['144p', '360p', '720p'].map(quality => ({
        quality,
        sizeMb: sourceSizeMb * (quality === '144p' ? 0.1 : quality === '360p' ? 0.3 : 0.6),
      }));
      videos.set(videoId, { uploaderId, transcodedVariants });
      return transcodedVariants;
    }
    return { uploadVideo };
  }, 'Video platform generating multiple bitrates for adaptive streaming.');
};
