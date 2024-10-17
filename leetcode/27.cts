function removeElement(nums: number[], val: number): number {
    let p = -1;
    let i = 0;
    let k = 0;
    while (i < nums.length) {
        if (nums[i] === val) {
            if (p === -1) {
                p = i;
            }
            k++;
        } else {
            if (p !== -1) {
                nums[p++] = nums[i]
            }
        }
        i++;
    }
    console.log(nums)
    return nums.length - k;
}

console.log(removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));
