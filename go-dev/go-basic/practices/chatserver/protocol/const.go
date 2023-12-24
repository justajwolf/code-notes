package protocol

// 消息type
type MsgType string

const (
	SEND    MsgType = "SEND"
	MESSAGE MsgType = "MESSAGE"
	NAME    MsgType = "NAME"
)
