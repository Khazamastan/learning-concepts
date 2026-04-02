export function sortByProperty(array, property, direction = 'asc') {
  const multiplier = direction === 'desc' ? -1 : 1;
  return [...array].sort((a, b) => {
    if (a[property] === b[property]) return 0;
    return a[property] > b[property] ? multiplier : -multiplier;
  });
}
