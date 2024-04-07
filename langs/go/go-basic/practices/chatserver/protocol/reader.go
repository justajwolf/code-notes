package protocol

import (
	"bufio"
	"io"
)

type Reader struct {
	reader *bufio.Reader
}

func NewReader(reader io.Reader) *Reader {
	return &Reader{
		reader: bufio.NewReader(reader),
	}
}

func (r *Reader) Read() (interface{}, error) {
	msg, err := r.reader.ReadString(' ')
	if err != nil {
		return nil, err
	}
	var cmdDto interface{}
	msg = msg[:len(msg)-1]
	switch MsgType(msg) {
	case SEND:
		msg, err = r.reader.ReadString('\n')
		if err == nil {
			cmdDto = CmdSend{
				Message: msg[:len(msg)-1],
			}
		}
	case MESSAGE:
		msg, err := r.reader.ReadString(' ')
		if err == nil {
			dto := CmdMess{
				Name: msg[:len(msg)-1],
			}
			msg, err = r.reader.ReadString('\n')
			if err == nil {
				dto.Message = msg[:len(msg)-1]
			}
			cmdDto = dto
		}
		if err != nil {
			return nil, err
		}
	case NAME:
		name, err := r.reader.ReadString('\n')
		if err == nil {
			cmdDto = CmdName{
				Name: name[:len(name)-1],
			}
		}
	}
	return cmdDto, nil
}
