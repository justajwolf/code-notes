package attempt

import (
	"fmt"
)

/*
type slice struct {
	array unsafe.Pointer // 数组指针
	len   int            // 数组实际长度
	cap   int            // 数组预留长度，即切片容量/数组总长度
}
尚存疑问：
	1.切片含义指的是底层数组，还是本身结构体？
	2.append扩容只是底层数组地址变了，切片变量的地址并未改变，这个时候说的新的切片指代的是底层数组吗？
*/

// 数组截取切片
func SliceArray() {
	var array [10]int
	// array := make([]int, 10)
	fmt.Printf("array: len(%d), cap(%d)\n", len(array), cap(array))
	slice := array[5:6]
	fmt.Printf("slice: len(%d), cap(%d)\n", len(slice), cap(slice))
	fmt.Println(&slice[0] == &array[5])
}

// 切片append
func SliceAppend() {
	var slice []int
	fmt.Printf("before: len(%d), cap(%d), pointer(%p)\n", len(slice), cap(slice), &slice)
	slice = append(slice, 1, 2, 3)
	fmt.Printf("append: len(%d), cap(%d), pointer(%p)\n", len(slice), cap(slice), &slice)
	/*
		newSlice地址变了，是因为:
			newSlice := AddElemnt(&slice, 4)
			等价于
				slice = AddElemnt(&slice, 4)
				newSlice := slice ==> 其实是声明了一个新的切片，拷贝赋值slice
	*/
	newSlice := AddElemnt(&slice, 4)
	fmt.Printf("AddElemnt: len(%d), cap(%d), pointer(%p)\n", len(newSlice), cap(newSlice), &newSlice)
	fmt.Println(&slice[0] == &newSlice[0])
}
func AddElemnt(slice *[]int, e int) []int {
	fmt.Printf("append1: len(%d), cap(%d), pointer(%p)\n", len(*slice), cap(*slice), &slice)
	return append(*slice, e)
}

// 切片截取
func Slice() {
	orderLen := 5
	order := make([]uint16, 2*orderLen)
	pollorder := order[:orderLen:orderLen]
	lockorder := order[orderLen:][:orderLen:orderLen]
	fmt.Println("len(pollorder) = ", len(pollorder))
	fmt.Println("cap(pollorder) = ", cap(pollorder))
	fmt.Println("len(lockorder) = ", len(lockorder))
	fmt.Println("cap(lockorder) = ", cap(lockorder))
}

// 验证1：数组切片后，切片append会覆盖原数组
func SliceVerify1() {
	array := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	fmt.Printf("array init: p(%p), len(%d), cap(%d), %+v\n", &array, len(array), cap(array), array)

	slice := array[3:6]
	fmt.Printf("slice: p(%p), len(%d), cap(%d), %+v\n", &slice, len(slice), cap(slice), slice)

	slice = append(slice, -1, -2)
	fmt.Printf("slice append: p(%p), len(%d), cap(%d), %+v\n", &slice, len(slice), cap(slice), slice)
	fmt.Printf("array: p(%p), len(%d), cap(%d), %+v\n", &array, len(array), cap(array), array)
}

// 验证2：数组切片后，切片append的元素超过原始数组cap，会扩容重新分配一个底层数组(一般是翻倍扩容)，完全拷贝原始数组数据到新数组
func SliceVerify2() {
	array := [4]int{1, 2, 3, 4}
	fmt.Printf("array init: p(%p), len(%d), cap(%d), %+v\n", &array, len(array), cap(array), array)

	slice := array[:2]
	fmt.Printf("slice: p(%p), len(%d), cap(%d), %+v\n", &slice, len(slice), cap(slice), slice)

	// 此次append还不满，所以不用扩容
	slice = append(slice, -1)
	fmt.Printf("slice append1: p(%p), len(%d), cap(%d), %+v\n", &slice, len(slice), cap(slice), slice)
	fmt.Printf("array: p(%p), len(%d), cap(%d), %+v\n", &array, len(array), cap(array), array)

	// 此次append直接超容量，触发扩容
	slice = append(slice, -2, -3, -4, -5)
	fmt.Printf("slice append2: p(%p), len(%d), cap(%d), %+v\n", &slice, len(slice), cap(slice), slice)
	fmt.Printf("array: p(%p), len(%d), cap(%d), %+v\n", &array, len(array), cap(array), array)
}
