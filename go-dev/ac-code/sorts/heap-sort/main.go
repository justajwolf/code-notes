package main

import "fmt"

func main() {
	fmtHeapSort([]int{2, 6, 8, 3, 7, 9, 0, 1})
}
func fmtHeapSort(arr []int) {
	fmt.Printf("输入：%+v\n", arr)
	fmt.Printf("输出(升序)：%+v\n", HeapSortAsc(arr))
	fmt.Printf("输出(降序)：%+v\n", HeapSortDesc(arr))
}

// 堆排序：大顶堆(从小到大排序)
func HeapSortAsc(arr []int) []int {
	length := len(arr)
	// 初始化构建大顶堆
	for i := (length - 1) / 2; i >= 0; i-- {
		HeapAdjustMax(&arr, i, length)
	}
	// 循环调整堆顶，
	for i := length - 1; i > 0; i-- {
		arr[i], arr[0] = arr[0], arr[i]
		HeapAdjustMax(&arr, 0, i)
	}
	return arr
}

// 调整大顶堆
func HeapAdjustMax(arr *[]int, k, length int) {
	old_parent := (*arr)[k]
	for i := k*2 + 1; i < length; i = i*2 + 1 {
		if i+1 < length && (*arr)[i] < (*arr)[i+1] {
			i++
		}
		if (*arr)[i] > old_parent {
			(*arr)[k] = (*arr)[i]
			k = i
			continue
		}
		break
	}
	(*arr)[k] = old_parent
}

// 堆排序：小顶堆(从大到小排序)
func HeapSortDesc(arr []int) []int {
	length := len(arr)
	// 初始化构建大顶堆
	for i := (length - 1) / 2; i >= 0; i-- {
		HeapAdjustMin(&arr, i, length)
	}
	// 循环调整堆顶，
	for i := length - 1; i > 0; i-- {
		arr[i], arr[0] = arr[0], arr[i]
		HeapAdjustMin(&arr, 0, i)
	}
	return arr
}

// 调整小顶堆
func HeapAdjustMin(arr *[]int, k, length int) {
	old_parent := (*arr)[k]
	for i := k*2 + 1; i < length; i = i*2 + 1 {
		if i+1 < length && (*arr)[i] > (*arr)[i+1] {
			i++
		}
		if (*arr)[i] < old_parent {
			(*arr)[k] = (*arr)[i]
			k = i
			continue
		}
		break
	}
	(*arr)[k] = old_parent
}
