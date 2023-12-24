package attempt

import (
	"fmt"
)

/*
type hchan struct {
	dataqsiz uint           // 环形缓存队列长度
	qcount   uint           // 环形缓存队列当前剩余元素个数
	buf      unsafe.Pointer // 环形缓存队列指针
	elemsize uint16         // 元素的类型大小
	elemtype *_type         // 元素类型
	closed   uint32         // 表示关闭状态
	sendx    uint           // 环形缓存队列下标，指示元素[写入]时存放到队列中的位置
	recvx    uint           // 环形缓存队列下标，指示元素[读取]时从队列中获取的位置
	recvq    waitq          // 等待[读]消息的goroutine队列
	sendq    waitq          // 等待[写]消息的goroutine队列
	lock     mutex          // 互斥锁，chan不允许并发读写
}
*/

func ChanCap() {
	ch := make(chan int, 10)
	ch <- 1
	ch <- 2
	// fmt.Printf("chan: %d,", <-ch)
	// fmt.Println(<-ch)
	fmt.Printf("info: len(ch)=%d, cap(ch)=%d\n", len(ch), cap(ch))
}

func Mutex2() {
	counter := 0
	ch := make(chan int, 1)
	fmt.Println("start")
	go Worker(&counter, ch)
	go Worker(&counter, ch)
	fmt.Println("end")
}
func Worker(counter *int, ch chan int) {
	ch <- 1
	(*counter)++
	fmt.Println(*counter)
	<-ch
}
