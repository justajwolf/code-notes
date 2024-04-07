package main

import (
	"fmt"
)

/*
题目977. 有序数组的平方(https://leetcode-cn.com/problems/squares-of-a-sorted-array/)
	描述:
		给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
		请你设计时间复杂度为 O(n) 的算法解决本问题
	示例1：
		输入：nums = [-4,-1,0,3,10]
		输出：[0,1,9,16,100]
		解释：平方后，数组变为 [16,1,0,9,100]
		排序后，数组变为 [0,1,9,16,100]
	示例2：
		输入：nums = [-7,-3,2,3,11]
		输出：[4,9,9,49,121]
*/
func main() {
	fmt.Println(sortedSquares([]int{-1}))
}

func sortedSquares(nums []int) []int {
	edge := 0
	for {
		if edge >= len(nums) || nums[edge] >= 0 {
			break
		}
		nums[edge] *= nums[edge]
		edge++
	}
	sorted := make([]int, len(nums))
	i, l, r := 0, edge-1, edge
	for l >= 0 && r < len(nums) {
		if nums[l] > nums[r]*nums[r] {
			sorted[i] = nums[r] * nums[r]
			r++
		} else {
			sorted[i] = nums[l]
			l--
		}
		i++
	}
	for l >= 0 {
		sorted[i] = nums[l]
		i++
		l--
	}
	for r < len(nums) {
		sorted[i] = nums[r] * nums[r]
		i++
		r++
	}
	return sorted
}
