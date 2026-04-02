// Maximum Subarray using Kadane's algorithm.
function maxSubArray(nums) {
  let currentSum = nums[0];
  let bestSum = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    bestSum = Math.max(bestSum, currentSum);
  }

  return bestSum;
}

module.exports = { maxSubArray };

if (require.main === module) {
  console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
}
