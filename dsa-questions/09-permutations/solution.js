// Permutations via backtracking.
function permute(nums) {
  const result = [];
  const used = new Array(nums.length).fill(false);
  const current = [];

  function backtrack() {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i += 1) {
      if (used[i]) {
        continue;
      }
      used[i] = true;
      current.push(nums[i]);
      backtrack();
      current.pop();
      used[i] = false;
    }
  }

  backtrack();
  return result;
}

module.exports = { permute };

if (require.main === module) {
  console.log(permute([1, 2, 3]));
}
