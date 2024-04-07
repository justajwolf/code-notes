package main

import (
	"fmt"
	"sync"
	"time"
)

var (
	ready = false
	sNum  = 3
)

func main() {
	cond := sync.NewCond(&sync.Mutex{})
	for i := 0; i < sNum; i++ {
		go Sing(i, cond)
	}

	time.Sleep(time.Second * 3)
	time.Sleep(time.Second * 3)
	for i := 0; i < sNum; i++ {
		ready = true
		cond.Broadcast() // 一次性全部唤醒
		// cond.Signal() // 随机唤醒一个
		time.Sleep(time.Second * 3)
	}
	fmt.Println("all singer were song")
}

func Sing(sId int, c *sync.Cond) {
	fmt.Printf("Singer(%d): ready\n", sId)
	c.L.Lock()
	for !ready {
		fmt.Printf("Singer(%d): waiting\n", sId)
		c.Wait()
	}
	fmt.Printf("Singer(%d): song\n", sId)
	ready = false // 阻塞其它没有抢到锁的，等待下一次唤醒(Broadcast唤醒全部)
	c.L.Unlock()
}
