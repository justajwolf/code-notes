package main

import (
	"flag"
	"fmt"
	"log"
	"time"

	"github.com/justajwolf/go-dev/go-basic/practices/chatserver/client"
	"github.com/justajwolf/go-dev/go-basic/practices/chatserver/server"
)

var address = flag.String("address", "127.0.0.1:3333", "address of server")

func main() {
	flag.Parse()
	StartServer()
	ch := make(chan interface{})
	go RobotClient(ch, "cbh001")
	go RobotClient(ch, "cbh002")
	go RobotClient(ch, "cbh003")
	go RobotClient(ch, "cbh004")
	for msg := range ch {
		log.Println(msg)
	}
}

func StartServer() {
	var (
		err error
	)
	server := server.NewServerTcp()
	if err = server.Listen(":3333"); err != nil {
		log.Printf("Server Listen error:%v", err)
		return
	}
	go server.Start()
}

func RobotClient(ch chan<- interface{}, name string) {
	client := client.NewClientTcp(name)
	defer client.Close()

	var (
		err error
	)
	if err = client.Dial(*address); err != nil {
		log.Printf("Client Dail error: %v", err)
		return
	}

	go client.Start()

	if err = client.SetName(name); err != nil {
		log.Printf("SetName error:%v", err)
		return
	}

	go func() {
		ticker := time.NewTicker(time.Second)
		for range ticker.C {
			client.SendMess(fmt.Sprintf("%s:%v", name, time.Now()))
		}
	}()

	for msg := range client.InComing() {
		ch <- msg
	}
}
