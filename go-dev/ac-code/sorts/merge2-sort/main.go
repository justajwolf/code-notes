package main

import "fmt"

func main() {
	fmtMerge2Sort([]int{2, 6, 8, 3, 7, 9, 0, 1})
}
func fmtMerge2Sort(arr []int) {
	fmt.Printf("输入：%+v\n", arr)
	fmt.Printf("输出(升序)：%+v\n", Merge2SortAsc(arr))
	fmt.Printf("输出(降序)：%+v\n", Merge2SortDesc(arr))
}

// 2路归并排序：从小到大排序
func Merge2SortAsc(arr []int) []int {
	length := len(arr)
	if length <= 1 {
		return arr
	}
	mid := length / 2
	left := Merge2SortAsc(arr[:mid])
	right := Merge2SortAsc(arr[mid:])
	merge := make([]int, length)
	for l, r, i := 0, 0, 0; i < length; i++ {
		switch {
		case l == mid:
			merge[i] = right[r]
			r++
		case r == length-mid:
			merge[i] = left[l]
			l++
		case left[l] <= right[r]:
			merge[i] = left[l]
			l++
		case left[l] > right[r]:
			merge[i] = right[r]
			r++
		}
	}
	return merge
}

// 2路归并排序：从大到小排序
func Merge2SortDesc(arr []int) []int {
	length := len(arr)
	if length <= 1 {
		return arr
	}
	mid := length / 2
	left := Merge2SortDesc(arr[:mid])
	right := Merge2SortDesc(arr[mid:])
	merge := make([]int, length)
	for l, r, i := 0, 0, 0; i < length; i++ {
		switch {
		case l == mid:
			merge[i] = right[r]
			r++
		case r == length-mid:
			merge[i] = left[l]
			l++
		case left[l] >= right[r]:
			merge[i] = left[l]
			l++
		case left[l] < right[r]:
			merge[i] = right[r]
			r++
		}
	}
	return merge
}
