configure:
	cp $(shell go env GOROOT)/misc/wasm/wasm_exec.js ./
	cp $(shell go env GOROOT)/misc/wasm/wasm_exec_node.js ./

build-js:
	GOOS=js GOARCH=wasm  go build -o main-js.wasm wasm-js.go

run-node:
	node wasm.mjs