package client

import (
	"io"
	"log"
	"net"
	"time"

	"github.com/justajwolf/go-dev/go-basic/practices/chatserver/protocol"
)

type ClientTcp struct {
	conn     net.Conn
	name     string
	reader   *protocol.Reader
	writer   *protocol.Writer
	incoming chan protocol.CmdMess
}

func NewClientTcp(name string) *ClientTcp {
	return &ClientTcp{
		name:     name,
		incoming: make(chan protocol.CmdMess),
	}
}

func (c *ClientTcp) Dial(address string) error {
	conn, err := net.Dial("tcp", address)
	if err != nil {
		return err
	}
	c.conn = conn
	c.reader = protocol.NewReader(conn)
	c.writer = protocol.NewWriter(conn)
	return nil
}

func (c *ClientTcp) Start() {
	log.Printf("Starting client:%s\n", c.name)

	time.Sleep(4 * time.Second)
	for {
		cmdDto, err := c.reader.Read()

		if err == io.EOF {
			break
		} else if err != nil {
			log.Printf("Read error %v", err)
		}

		if cmdDto != nil {
			switch v := cmdDto.(type) {
			case protocol.CmdMess:
				c.incoming <- v
			default:
				log.Printf("unknown cmd:%v", v)
			}
		}
	}
}

func (c *ClientTcp) Close() {
	c.conn.Close()
}

func (c *ClientTcp) Send(cmd interface{}) error {
	return c.writer.WriteCmd(cmd)
}

func (c *ClientTcp) SetName(name string) error {
	c.name = name
	return c.Send(protocol.CmdName{
		Name: name,
	})
}

func (c *ClientTcp) SendMess(msg string) error {
	return c.Send(protocol.CmdSend{
		Message: msg,
	})
}

func (c *ClientTcp) InComing() chan protocol.CmdMess {
	return c.incoming
}
