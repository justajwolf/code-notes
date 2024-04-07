package main

import (
	"fmt"
	"sync"
)

func main() {
	wg := sync.WaitGroup{}
	once := sync.Once{}

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go func(index int) {
			defer wg.Done()
			// print(index)
			once.Do(func() {
				print(index)
			})
		}(i)
	}

	wg.Wait()
}

func print(i int) {
	fmt.Printf("index: %d\n", i)
}
