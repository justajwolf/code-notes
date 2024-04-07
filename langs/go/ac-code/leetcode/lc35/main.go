package main

import "fmt"

/*
题目35. 搜索插入位置(https://leetcode-cn.com/problems/search-insert-position)
	描述:
		给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
		请必须使用时间复杂度为 O(log n) 的算法。
	示例1：
		输入：nums = [1,3,5,6], target = 5
		输出：2
	示例2：
		输入：nums = [1,3,5,6], target = 2
		输出：1
	示例3：
		输入：nums = [1,3,5,6], target = 7
		输出：4
	示例4：
		输入：nums = [1,3,5,6], target = 0
		输出：0
	示例5：
		输入：nums = [1], target = 0
		输出：0
*/
func main() {
	fmt.Println(searchInsert([]int{1, 3, 5, 6}, 5))
	fmt.Println(searchInsert([]int{1, 3, 5, 6}, 2))
	fmt.Println(searchInsert([]int{1, 3, 5, 6}, 7))
	fmt.Println(searchInsert([]int{1, 3, 5, 6}, 0))
}

func searchInsert(nums []int, target int) int {
	start, end := 0, len(nums)-1
	for start <= end {
		mid := (start + end) / 2
		switch {
		case nums[mid] == target:
			return mid
		case nums[mid] > target:
			end = mid - 1
		case nums[mid] < target:
			start = mid + 1
		}
	}
	return start
}
