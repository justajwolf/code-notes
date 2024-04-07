package main

import "fmt"

func main() {
	fmtInsertSort([]int{2, 6, 8, 3, 7, 9, 0, 1})
}
func fmtInsertSort(arr []int) {
	fmt.Printf("输入：%+v\n", arr)
	fmt.Printf("输出(升序)：%+v\n", InsertSortAsc(arr))
	fmt.Printf("输出(降序)：%+v\n", InsertSortDesc(arr))
}

// 插入排序：从小到大排序
func InsertSortAsc(arr []int) []int {
	for i := 1; i < len(arr); i++ {
		input := arr[i]
		j := i - 1
		for j >= 0 && arr[j] > input {
			arr[j+1] = arr[j]
			j--
		}
		arr[j+1] = input
	}
	return arr
}

// 插入排序：从大到小排序
func InsertSortDesc(arr []int) []int {
	for i := 1; i < len(arr); i++ {
		input := arr[i]
		j := i - 1
		for j >= 0 && arr[j] < input {
			arr[j+1] = arr[j]
			j--
		}
		arr[j+1] = input
	}
	return arr
}
