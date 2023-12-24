package main

import "fmt"

/*
题目198：打家劫舍
	你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
	给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
*/

func main() {
	fmtRob([]int{1, 2, 3, 1})
	fmtRob([]int{2, 7, 9, 3, 1})
}
func fmtRob(arr []int) {
	fmt.Printf("输入：%+v\n", arr)
	fmt.Printf("输出：%+v\n", Rob(arr))
}

// 循环写法(正解，加result缓存，使用空间换取时间)
func Rob(nums []int) int {
	length := len(nums)
	result := make([]int, length)
	copy(result, nums)
	max := 0
	for i := 0; i < length; i++ {
		for j := i + 2; j < length; j++ {
			sum := nums[j] + result[i]
			if sum > result[j] {
				result[j] = sum
			}
		}
		if result[i] > max {
			max = result[i]
		}
	}
	return max
}

// 递归写法(超时，未使用缓存，导致重复计算，耗费时间)
func Rob1(nums []int) int {
	length := len(nums)
	switch length {
	case 0:
		return 0
	case 1:
		return nums[0]
	}
	max := 0
	for i := 0; i < length; i++ {
		temp := 0
		for j := i + 2; j < length; j++ {
			p := Rob(nums[j:])
			if p > temp {
				temp = p
			}
		}
		temp += nums[i]
		if temp > max {
			max = temp
		}
	}
	return max
}
