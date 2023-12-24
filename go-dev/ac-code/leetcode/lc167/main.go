package main

import "fmt"

/*
题目167. 两数之和 II - 输入有序数组(https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)
	描述:
		给定一个已按照 非递减顺序排列  的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target 。
		函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。numbers 的下标 从 1 开始计数 ，所以答案数组应当满足 1 <= answer[0] < answer[1] <= numbers.length 。
		你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

	示例1：
		输入：numbers = [2,7,11,15], target = 9
		输出：[1,2]
		解释：2 与 7 之和等于目标数 9，因此 index1 = 1, index2 = 2
	示例2：
		输入：numbers = [2,3,4], target = 6
		输出：[1,3]
	示例3：
		输入：numbers = [-1,0], target = -1
		输出：[1,2]

	提示：
		2 <= numbers.length <= 3 * 10^4
		-1000 <= numbers[i] <= 1000
		numbers 按 非递减顺序 排列
		-1000 <= target <= 1000
		仅存在一个有效答案


*/
func main() {
	fmt.Println(twoSum([]int{2, 7, 11, 15}, 9))
	fmt.Println(twoSum([]int{2, 3, 4}, 6))
	fmt.Println(twoSum([]int{-1, 0}, -1))
}

func twoSum(numbers []int, target int) []int {
	i, j := 0, len(numbers)-1
	for ; i <= j; i++ {
		rest := target - numbers[i]
		for j > i {
			if numbers[j] > rest {
				j--
			} else {
				break
			}
		}
		if numbers[j] == rest {
			break
		}
	}
	return []int{i + 1, j + 1}
}
