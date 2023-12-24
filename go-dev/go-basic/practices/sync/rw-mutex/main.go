package main

import (
	"fmt"
	"sync"
	"time"
)

func main() {
	p := pass{pwd: "cbh"}
	for i := 0; i < 10; i++ {
		i := i
		go p.Change(fmt.Sprintf("cbh%d", i))
		go p.GetPwd(i)
	}
	p.GetPwd(10)
	time.Sleep(time.Second * 15)
	fmt.Println("ok......")
}

type pass struct {
	pwd string
	RWM sync.RWMutex
}

func (p *pass) Change(pwd string) {
	p.RWM.Lock()
	defer p.RWM.Unlock()

	p.pwd = pwd
	fmt.Printf("change: %s\n", pwd)
	time.Sleep(time.Second * 1)
}

func (p *pass) GetPwd(i int) string {
	p.RWM.RLock()
	defer p.RWM.RUnlock()

	fmt.Printf("read: %v-%s\n", i, p.pwd)
	time.Sleep(time.Second * 1)
	return p.pwd
}
