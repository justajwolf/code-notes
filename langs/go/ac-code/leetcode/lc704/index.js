fmtTest([-1,0,3,5,9,12], 9)
fmtTest([-1,0,3,5,9,12], 2)
function fmtTest(nums, target) {
  console.log(`输入：nums = ${nums}, target = ${target}`)
  console.log(`输出：${search(nums, target)}`)
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  let start = 0
  let end = nums.length - 1
  while(start <= end) {
    const mid = parseInt((start+end)/2)
    if (nums[mid] === target) {
      return mid
    }
    if (nums[mid] > target) {
      end = mid - 1
    } else {
      start = mid + 1
    }
  }
  return -1
};