package protocol

import "errors"

var (
	ErrCmdUnknow = errors.New("unknow command")
)

type CmdSend struct {
	Message string
}

type CmdName struct {
	Name string
}

type CmdMess struct {
	Name    string
	Message string
}
