package goroutine

import (
	"fmt"
	"math/rand"
	"time"
)

// producer : customer = m : 1
func csp1() {
	// 创建一个字符串类型的通道
	channel := make(chan string)
	// 创建producer()函数的并发goroutine
	go producer("cat", channel)
	go producer("dog", channel)
	go producer("pig", channel)
	// 数据消费函数
	customer("cbh1", channel)
}

// producer : customer = 1 : n
func csp2() {
	// 创建一个字符串类型的通道
	channel := make(chan string)
	// 数据消费函数1
	go customer("cbh1", channel)
	// 数据消费函数2
	go customer("cbh2", channel)
	// 数据消费函数3
	go customer("cbh3", channel)

	// 创建producer()函数的并发goroutine
	producer("cat", channel)
}

// producer : customers = m : n
func csp3() {
	// 创建一个字符串类型的通道
	channel := make(chan string)
	// 创建producer()函数的并发goroutine
	go producer("cat", channel)
	go producer("dog", channel)
	go producer("pig", channel)
	// 数据消费函数
	go customer("cbh1", channel)
	go customer("cbh2", channel)
	customer("cbh3", channel)
}

// 数据生产者
func producer(header string, channel chan<- string) {
	// 无限循环, 不停地生产数据
	for {
		// 将随机数和字符串格式化为字符串发送给通道
		channel <- fmt.Sprintf("%s: %v", header, rand.Int31())
		// 等待1秒
		time.Sleep(time.Second)
	}
}

// 数据消费者
func customer(name string, channel <-chan string) {
	// 不停地获取数据
	for {
		// 从通道中取出数据, 此处会阻塞直到信道中返回数据
		message := <-channel
		// 打印数据
		fmt.Printf("name:%v, message:%v\n", name, message)
	}
}
