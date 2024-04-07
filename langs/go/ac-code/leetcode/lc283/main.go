package main

import "fmt"

/*
题目283. 移动零(https://leetcode-cn.com/problems/move-zeroes/)
	描述:
		给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
		必须在原数组上操作，不能拷贝额外的数组。
		尽量减少操作次数。
	示例1：
		输入: [0,1,0,3,12]
		输出: [1,3,12,0,0]
*/
func main() {
	moveZeroes([]int{0, 1, 0, 3, 12})
	moveZeroes([]int{1})
	moveZeroes([]int{1, 0})
}

func moveZeroes(nums []int) {
	for i := 0; i < len(nums); i++ {
		if nums[i] != 0 {
			continue
		}
		j := i + 1
		for j < len(nums) {
			if nums[j] != 0 {
				break
			}
			j++
		}
		if j < len(nums) {
			nums[i], nums[j] = nums[j], nums[i]
		}
	}
	fmt.Println(nums)
}
