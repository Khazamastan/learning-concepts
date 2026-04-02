// Top K Frequent Elements using frequency map and bucket sort.
function topKFrequent(nums, k) {
  const counts = new Map();
  for (const num of nums) {
    counts.set(num, (counts.get(num) || 0) + 1);
  }

  const buckets = Array(nums.length + 1)
    .fill(null)
    .map(() => []);

  for (const [num, freq] of counts.entries()) {
    buckets[freq].push(num);
  }

  const result = [];
  for (let freq = buckets.length - 1; freq >= 0 && result.length < k; freq -= 1) {
    for (const num of buckets[freq]) {
      result.push(num);
      if (result.length === k) {
        break;
      }
    }
  }

  return result;
}

module.exports = { topKFrequent };

if (require.main === module) {
  console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
}
