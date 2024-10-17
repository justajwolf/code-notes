function removeDuplicates(nums: number[]): number {
    let val = nums[0];
    let i = 1;
    let p = -1;
    let count = 1;
    let k = 1;
    while (i < nums.length) {
        if (val === nums[i]) {
            count++;
            if (p === -1) {
                p = i;
            }
            if (count <= 2) {
                if (p !== -1) {
                    nums[p++] = nums[i];
                    k++;
                }
            }
        } else {
            val = nums[i];
            count = 1;
            k++;
            if (p !== -1) {
                nums[p++] = nums[i];
            }
        }
        i++;
    }
    console.log(nums);
    return k;
}

console.log(removeDuplicates([0, 0, 1, 1, 1, 1, 2, 3, 3]));
