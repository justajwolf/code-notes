package main

import (
	"bufio"
	"fmt"
	"net"
	"time"
)

func main() {
	go server()
	time.Sleep(time.Second * 2)
	client()
}

func client() {
	p := make([]byte, 512)
	conn, err := net.Dial("udp", ":7778")
	if err != nil {
		fmt.Printf("Cli Dial err: %v", err)
		return
	}
	defer conn.Close()

	fmt.Fprintf(conn, "Hi UDP Server, %v\n", time.Now().Local().String())

	n, err := bufio.NewReader(conn).Read(p)
	if err == nil {
		fmt.Printf("Res: %s\n", p[0:n])
		return
	}
	fmt.Printf("Res err: %v\n", err)
}

func server() {
	p := make([]byte, 512)
	addr := net.UDPAddr{
		Port: 7778,
	}
	ser, err := net.ListenUDP("udp", &addr)
	if err != nil {
		fmt.Printf("Ser Listen err: %v", err)
		return
	}
	for {
		n, remoteAddr, err := ser.ReadFromUDP(p)
		fmt.Printf("Ser rec from %v: %s\n", remoteAddr, p[0:n])
		if err != nil {
			fmt.Printf("Ser rec err: %v\n", err)
			continue
		}
		go func(ser *net.UDPConn, remoteAddr *net.UDPAddr) {
			_, err := ser.WriteToUDP([]byte(fmt.Sprintf("time:%v", time.Now().Local())), remoteAddr)
			if err != nil {
				fmt.Printf("Ser send err: %v\n", err)
			}
		}(ser, remoteAddr)
	}
}
