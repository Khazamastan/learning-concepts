// Two Sum: return indices of the two numbers such that they add up to target.
function twoSum(nums, target) {
  const indexByValue = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const complement = target - nums[i];
    if (indexByValue.has(complement)) {
      return [indexByValue.get(complement), i];
    }
    indexByValue.set(nums[i], i);
  }
  return [];
}

module.exports = { twoSum };

if (require.main === module) {
  const example = [2, 7, 11, 15];
  const target = 9;
  console.log(twoSum(example, target));
}
