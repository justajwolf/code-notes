package server

import (
	"io"
	"log"
	"net"
	"sync"

	"github.com/justajwolf/go-dev/go-basic/practices/chatserver/protocol"
)

type client struct {
	conn   net.Conn
	name   string
	reader *protocol.Reader
	writer *protocol.Writer
}

type ServerTcp struct {
	listener net.Listener
	clients  []*client
	mutex    *sync.Mutex
}

func NewServerTcp() *ServerTcp {
	return &ServerTcp{
		mutex: &sync.Mutex{},
	}
}

func (s *ServerTcp) Listen(address string) error {
	l, err := net.Listen("tcp", address)
	if err == nil {
		s.listener = l
	}
	return err
}

func (s *ServerTcp) Broadcast(cmd interface{}) error {
	var err error
	for _, cli := range s.clients {
		err = cli.writer.WriteCmd(cmd)
		if err != nil {
			return err
		}
	}
	return err
}

func (s *ServerTcp) Close() {
	s.listener.Close()
}

func (s *ServerTcp) Start() {
	for {
		conn, err := s.listener.Accept()
		if err != nil {
			log.Println(err)
			continue
		}
		cli := s.makeClient(conn)
		go s.handleRequest(cli)
	}
}

func (s *ServerTcp) makeClient(conn net.Conn) *client {
	s.mutex.Lock()
	defer s.mutex.Unlock()

	cli := &client{
		conn:   conn,
		reader: protocol.NewReader(conn),
		writer: protocol.NewWriter(conn),
	}
	s.clients = append(s.clients, cli)
	return cli
}

func (s *ServerTcp) handleRequest(cli *client) {
	reader := cli.reader
	for {
		cmd, err := reader.Read()
		if err != nil && err != io.EOF {
			log.Printf("Read error:%v", err)
		}
		if cmd != nil {
			switch v := cmd.(type) {
			case protocol.CmdSend:
				go s.Broadcast(protocol.CmdMess{
					Message: v.Message,
					Name:    cli.name,
				})
			case protocol.CmdName:
				cli.name = v.Name
			}
		}
		if err == io.EOF {
			break
		}
	}
}
