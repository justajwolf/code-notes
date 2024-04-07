package main

import (
	"fmt"
	"sync"
)

var (
	m    sync.Mutex
	flag int
)

func main() {
	wg := sync.WaitGroup{}
	fmt.Printf("read: %d\n", read())
	for i := 1; i < 6; i++ {
		wg.Add(1)
		go func(num int) {
			defer wg.Done()
			set(num)
			fmt.Printf("read: %d\n", read())
		}(i)
	}
	wg.Wait()
}

func set(num int) {
	m.Lock()
	defer m.Unlock()

	flag = num
	fmt.Printf("write: %d\n", num)
}

func read() int {
	m.Lock()
	defer m.Unlock()

	a := flag
	return a
}
