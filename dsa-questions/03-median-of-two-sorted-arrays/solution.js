// Median of Two Sorted Arrays using binary search partitioning.
function findMedianSortedArrays(nums1, nums2) {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const partitionX = Math.floor((left + right) / 2);
    const partitionY = Math.floor((m + n + 1) / 2) - partitionX;

    const maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    const minRightX = partitionX === m ? Infinity : nums1[partitionX];

    const maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    const minRightY = partitionY === n ? Infinity : nums2[partitionY];

    if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
      }
      return Math.max(maxLeftX, maxLeftY);
    }

    if (maxLeftX > minRightY) {
      right = partitionX - 1;
    } else {
      left = partitionX + 1;
    }
  }

  throw new Error('Input arrays must be sorted.');
}

module.exports = { findMedianSortedArrays };

if (require.main === module) {
  console.log(findMedianSortedArrays([1, 3], [2]));
}
