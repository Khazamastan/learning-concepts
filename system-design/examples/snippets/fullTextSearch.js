module.exports = register => {
  register('fullTextSearch', () => {
    const documents = [
      { id: 1, content: 'Learn system design for interviews' },
      { id: 2, content: 'Real-time chat messaging patterns' },
    ];
    function search(term) {
      return documents.filter(doc => doc.content.toLowerCase().includes(term.toLowerCase()));
    }
    return search;
  }, 'Knowledge base enabling substring search across engineering playbooks.');
};
