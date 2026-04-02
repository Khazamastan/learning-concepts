/**
 * Find the most frequent word in a paragraph.
 * @param {string} text
 * @returns {{word: string|null, count: number}}
 */
export function mostFrequentWord(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const counts = words.reduce((acc, word) => {
    acc[word] = (acc[word] ?? 0) + 1;
    return acc;
  }, {});

  let topWord = null;
  let topCount = 0;
  Object.entries(counts).forEach(([word, count]) => {
    if (count > topCount) {
      topWord = word;
      topCount = count;
    }
  });

  return { word: topWord, count: topCount };
}
