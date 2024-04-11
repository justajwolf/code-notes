//go:build js && wasm

package main

import (
	"os"
	"syscall/js"
)

func main() {
	modname := os.Args[0]

	obj := make(map[string]interface{})
	obj["name"] = modname
	obj["add"] = js.FuncOf(Add)

	js.Global().Set(modname, js.ValueOf(obj))

	select {}
}

func Add(this js.Value, i []js.Value) interface{} {
	return i[0].Int() + i[1].Int()
}
