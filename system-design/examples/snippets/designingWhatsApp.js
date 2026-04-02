module.exports = register => {
  register('designingWhatsApp', () => {
    const conversations = new Map();
    function sendMessage(chatId, message) {
      const history = conversations.get(chatId) || [];
      history.push({ ...message, deliveredAt: Date.now() });
      conversations.set(chatId, history);
      return history.length;
    }
    return { sendMessage };
  }, 'Messaging app storing chat history with delivery timestamps for sync.');
};
