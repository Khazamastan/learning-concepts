module.exports = register => {
  register('designingLiveStreamingSystem', () => {
    const streams = new Map();
    function startStream(streamId, bitrateKbps) {
      streams.set(streamId, { viewers: new Set(), bitrateKbps });
    }
    function joinStream(streamId, userId) {
      const stream = streams.get(streamId);
      if (!stream) return false;
      stream.viewers.add(userId);
      return stream.viewers.size;
    }
    return { startStream, joinStream };
  }, 'Live events platform coordinating viewers joining real-time broadcasts.');
};
