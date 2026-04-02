export function countComments(tree) {
  if (!tree) return 0;
  if (Array.isArray(tree)) {
    return tree.reduce((total, comment) => total + countComments(comment), 0);
  }
  const replies = Array.isArray(tree.replies) ? tree.replies : [];
  return 1 + replies.reduce((total, reply) => total + countComments(reply), 0);
}
