package main

import (
	"context"
	"fmt"
	"net"
	"time"

	"github.com/justajwolf/go-dev/go-basic/practices/grpc/pbs"
	"google.golang.org/grpc"
)

func main() {
	addr := "127.0.0.1:18887"
	go Server(addr)
	time.Sleep(time.Second * 3)
	Client(addr)
}

func Server(addr string) {
	ln, err := net.Listen("tcp", addr)
	if err != nil {
		fmt.Println("网络异常", err)
	}
	srv := grpc.NewServer()
	pbs.RegisterHelloServerServer(srv, &server{})
	err = srv.Serve(ln)
	if err != nil {
		fmt.Println("网络启动异常", err)
	}
}
func Client(addr string) {
	conn, err := grpc.Dial(addr, grpc.WithInsecure())
	if err != nil {
		fmt.Println("连接服务器失败", err)
	}
	defer conn.Close()

	c := pbs.NewHelloServerClient(conn)
	r1, err := c.SayHello(context.Background(), &pbs.HelloRequest{Name: "justajwolf"})
	if err != nil {
		fmt.Println("cloud not get hello server ..", err)
		return
	}
	fmt.Println("HelloServer resp: ", r1.Message)

	r2, err := c.GetHelloMsg(context.Background(), &pbs.HelloRequest{Name: "justajwolf"})
	if err != nil {
		fmt.Println("cloud not get hello msg ..", err)
		return
	}
	fmt.Println("HelloServer resp: ", r2.Msg)
}

type server struct {
	pbs.UnimplementedHelloServerServer
}

func (s *server) SayHello(ctx context.Context, in *pbs.HelloRequest) (*pbs.HelloReply, error) {
	return &pbs.HelloReply{
		Message: "hello " + in.GetName(),
	}, nil
}
func (s *server) GetHelloMsg(ctx context.Context, in *pbs.HelloRequest) (*pbs.HelloMessage, error) {
	return &pbs.HelloMessage{
		Msg: "this is from server!",
	}, nil
}
