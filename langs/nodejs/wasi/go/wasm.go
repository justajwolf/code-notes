//go:build js && wasm

package main

import (
	"fmt"
	"os"
	"syscall/js"
)

func main() {
	fmt.Println("Hello, WebAssembly!")

	modname := os.Args[0]
	fmt.Println(modname)
	js.Global().Get(modname).Set("add", js.FuncOf(Add))

	select {}
}

func Add(this js.Value, i []js.Value) interface{} {
	return i[0].Int() + i[1].Int()
}
