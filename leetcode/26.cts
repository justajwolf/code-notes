function removeDuplicates(nums: number[]): number {
    let val = nums[0];
    let i = 1;
    let k = 1;
    let p = -1;
    while (i < nums.length) {
        if (nums[i] === val) {
            if (p === -1) {
                p = i;
            }
        } else {
            k++;
            val = nums[i];
            if (p !== -1) {
                nums[p++] = nums[i];
            }
        }
        i++;
    }
    console.log(nums);
    return k;
}

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));
