package main

import "fmt"

/*
题目189. 旋转数组(https://leetcode-cn.com/problems/rotate-array/)
	描述:
		给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
		尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
		你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？
	示例1：
		输入: nums = [1,2,3,4,5,6,7], k = 3
		输出: [5,6,7,1,2,3,4]
		解释:
		向右旋转 1 步: [7,1,2,3,4,5,6]
		向右旋转 2 步: [6,7,1,2,3,4,5]
		向右旋转 3 步: [5,6,7,1,2,3,4]
	示例2：
		输入：nums = [-1,-100,3,99], k = 2
		输出：[3,99,-1,-100]
		解释:
		向右旋转 1 步: [99,-1,-100,3]
		向右旋转 2 步: [3,99,-1,-100]
*/
func main() {
	rotate([]int{1, 2, 3, 4, 5, 6, 7}, 3)
	rotate([]int{-1, -100, 3, 99}, 2)
	rotate([]int{1}, 1)
	rotate([]int{1, 2, 3, 4, 5, 6}, 3)

	rotate2([]int{1, 2, 3, 4, 5, 6, 7}, 3)
	rotate2([]int{-1, -100, 3, 99}, 2)
	rotate2([]int{1}, 1)
	rotate2([]int{1, 2, 3, 4, 5, 6}, 3)
}

func rotate(nums []int, k int) {
	k %= len(nums)
	// 不需要移动
	if k == 0 {
		// fmt.Println(nums)
		return
	}
	// 初始话起始访问位置
	swap, i, head := nums[0], 0, 0
	// 初始化计数器，n个元素都需要挪动位置
	n := len(nums)
	for n > 0 {
		// 计算i位置对应的目的位置j
		j := (i + k) % len(nums)
		// 将交换区元素(也就是i位置数据)放到目的位置j，并将目的位置j的数据放到交换区
		swap, nums[j] = nums[j], swap
		if head != j {
			// 若j不是此次环型交换的头位置，调整i指向新的位置j，准备进入下一次循环
			i = j
		} else if j+1 < len(nums) {
			// 若j是此次环型交换的头位置，并且j+1(等价于head+1)小于数组长度，说明本轮不是最后一轮环型交换，调整head
			head = j + 1
			// 重新初始i位置指向head
			i = head
			// 将i的数据放到交换区，准备进入新一轮交换
			swap = nums[i]
		}
		// 每移动完一个位置数组，计数器做--，直到所有元素都移动完成，结束循环
		n--
	}
	// fmt.Println(nums)
}

func rotate2(nums []int, k int) {
	k %= len(nums)
	if k == 0 {
		fmt.Println(nums)
		return
	}

	gcd := func(a, b int) int {
		for a != 0 {
			a, b = b%a, a
		}
		return b
	}
	for i, limit := 0, gcd(k, len(nums)); i < limit; i++ {
		swap, j := nums[i], i
		for ok := true; ok; ok = i != j {
			next := (j + k) % len(nums)
			swap, nums[next], j = nums[next], swap, next
		}
	}
	fmt.Println(nums)
}
