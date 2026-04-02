// Product of Array Except Self without using division.
function productExceptSelf(nums) {
  const length = nums.length;
  const result = new Array(length).fill(1);

  let prefixProduct = 1;
  for (let i = 0; i < length; i += 1) {
    result[i] = prefixProduct;
    prefixProduct *= nums[i];
  }

  let suffixProduct = 1;
  for (let i = length - 1; i >= 0; i -= 1) {
    result[i] *= suffixProduct;
    suffixProduct *= nums[i];
  }

  return result;
}

module.exports = { productExceptSelf };

if (require.main === module) {
  console.log(productExceptSelf([1, 2, 3, 4]));
}
