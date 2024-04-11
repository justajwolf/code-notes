//go:build js && wasm

package main

import (
	"os"
	"syscall/js"
)

func main() {
	modname := os.Args[0]

	done := make(chan bool, 0)

	mod := make(map[string]interface{})
	// 挂载 模块名
	mod["name"] = modname
	// 挂载 _exit 函数，显示挂载，用于js退出时，释放当前模块，否则js这个库会暴力使用 死锁结束
	mod["_exit"] = js.FuncOf(func(this js.Value, i []js.Value) interface{} {
		done <- true
		return 0
	})

	// 挂载 其它业务函数
	mount(mod)

	js.Global().Set(modname, js.ValueOf(mod))

	// fmt.Println("mod<" + modname + "> has exported.")

	<-done

	// fmt.Println("mod<" + modname + "> has released.")
}

func mount(mod map[string]interface{}) {
	// 挂载 add 函数
	mod["add"] = js.FuncOf(Add)
}

func Add(this js.Value, i []js.Value) interface{} {
	return i[0].Int() + i[1].Int()
}
