package attempt

import "fmt"

func PrintOne() {
	fmt.Println("hello, world")
}

func Foo() {
	defer func() {
		if err := recover(); err != nil {
			fmt.Printf("foo defer: %s\n", err)
			return
		}
		fmt.Println("foo defer")
	}()
	ch := make(chan int)
	go func() {
		close(ch)
	}()
	num := <-ch
	fmt.Println(num)
}
