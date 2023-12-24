package server

type Server interface {
	Listen(address string) error
	Broadcast(cmd interface{}) error
	Close()
	Start()
}
