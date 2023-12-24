package main

import (
	"fmt"
	"net/http"
	"time"
)

func main() {
	http.Handle("/", http.FileServer(http.Dir(".")))
	http.Handle("/now", http.HandlerFunc(func(rw http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(rw, "time.Now(): %v\n", time.Now())
	}))
	http.HandleFunc("/healthz", func(rw http.ResponseWriter, r *http.Request) {
		fmt.Fprintln(rw, "ok")
	})
	http.ListenAndServe(":8080", nil)
}
