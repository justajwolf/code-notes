package main

import (
	"bufio"
	"fmt"
	"log"
	"net"
	"net/rpc"
	"os"
	"time"
)

func main() {
	go server()
	time.Sleep(time.Second * 3)
	client()
}

func client() {
	cli, err := rpc.Dial("tcp", ":13133")
	if err != nil {
		log.Fatal(err)
	}

	in := bufio.NewReader(os.Stdin)
	for {
		fmt.Println("client start input:")
		line, _, err := in.ReadLine()
		if err != nil {
			log.Fatal(err)
		}
		reply := false
		err = cli.Call("Listener.GetLine", line, &reply)
		if err != nil {
			log.Fatal(err)
		}
		fmt.Printf("client: %v\n", reply)
	}
}

func server() {
	addr, err := net.ResolveTCPAddr("tcp", ":13133")
	if err != nil {
		log.Fatal(err)
	}

	inbound, err := net.ListenTCP("tcp", addr)
	if err != nil {
		log.Fatal(err)
	}

	listener := new(Listener)
	rpc.Register(listener)
	rpc.Accept(inbound)
}

type Listener int

func (l *Listener) GetLine(line []byte, ack *bool) error {
	fmt.Printf("server: %v\n", string(line))
	*ack = true
	return nil
}
