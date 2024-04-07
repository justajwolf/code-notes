package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	cache := sync.Pool{
		New: func() interface{} {
			b := make([]byte, 1024)
			return &b
		},
	}

	loop := 1000000000

	t1 := time.Now().Unix()
	for i := 0; i < loop; i++ {
		b := make([]byte, 1024)
		_ = b
	}
	t2 := time.Now().Unix()
	for i := 0; i < loop; i++ {
		b := cache.Get().(*[]byte)
		_ = b
		cache.Put(b)
	}
	t3 := time.Now().Unix()
	fmt.Println(t3)
	fmt.Printf("no cache: %d s\n", t2-t1)
	fmt.Printf("cache: %d s\n", t3-t2)
}
