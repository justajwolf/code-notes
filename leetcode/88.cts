/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
    let i = m + n - 1;
    let p1 = m - 1;
    let p2 = n - 1;
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[i--] = nums1[p1--];
            continue;
        }
        nums1[i--] = nums2[p2--];
    }
    while (p2 >= 0) {
        nums1[i--] = nums2[p2--];
    }
    console.log(nums1);
}

console.log(merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));
