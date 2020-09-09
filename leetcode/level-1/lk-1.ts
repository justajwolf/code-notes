export const twoSum = (nums, target) => {
  const resetMap = {};
  for(let i=0; i<nums.length; i++) {
      if (resetMap[nums[i]] !== undefined) {
        return [resetMap[nums[i]], i];
      }
      resetMap[target - nums[i]] = i;
  }
};

console.log(twoSum([2, 7, 11, 15], 9));