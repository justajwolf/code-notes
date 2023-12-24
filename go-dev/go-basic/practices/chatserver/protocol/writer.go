package protocol

import (
	"fmt"
	"io"
)

type Writer struct {
	writer io.Writer
}

func NewWriter(writer io.Writer) *Writer {
	return &Writer{
		writer: writer,
	}
}

func (w *Writer) WriteString(msg string) error {
	_, error := w.writer.Write([]byte(msg))
	return error
}

func (w *Writer) WriteCmd(cmd interface{}) error {
	switch v := cmd.(type) {
	case CmdSend:
		return w.WriteString(fmt.Sprintf("SEND %v\n", v.Message))
	case CmdMess:
		return w.WriteString(fmt.Sprintf("MESSAGE %v %v\n", v.Name, v.Message))
	case CmdName:
		return w.WriteString(fmt.Sprintf("NAME %v\n", v.Name))
	}
	return ErrCmdUnknow
}
