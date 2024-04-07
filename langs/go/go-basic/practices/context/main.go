package main

import (
	"context"
	"fmt"
	"time"
)

func main() {
	t := 4
	// TestChanClose(t)
	// TestWCancel(t)
	// TestWDeadline(t)
	TestWTimeout(t)
}

func TestChanClose(t int) {
	ch := make(chan struct{})
	go func() {
		time.Sleep(time.Second * 3)
		close(ch)
	}()

	select {
	case a := <-ch:
		fmt.Println("done:", a)
	case e := <-time.After(time.Second * time.Duration(4)):
		fmt.Println("deadline:", e)
	}
}

func TestWCancel(t int) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	go func() {
		time.Sleep(time.Second * 3)
		cancel()
	}()

	select {
	case done := <-ctx.Done():
		fmt.Printf("TestWCancel.done: %v, error: %v\n", done, ctx.Err())
	case e := <-time.After(time.Second * time.Duration(4)):
		fmt.Printf("TestWCancel: %v", e)
	}
}

func TestWDeadline(t int) {
	dl := time.Now().Add(time.Second * time.Duration(t))
	ctx, cancel := context.WithDeadline(context.Background(), dl)
	defer cancel()

	go func() {
		time.Sleep(time.Second * 3)
		cancel()
	}()

	select {
	case done := <-ctx.Done():
		fmt.Printf("TestWDeadline.done: %v, error: %v\n", done, ctx.Err())
	case e := <-time.After(time.Second * time.Duration(4)):
		fmt.Printf("TestWDeadline: %v", e)
	}
}

func TestWTimeout(t int) {
	ctx, cancel := context.WithTimeout(context.Background(), time.Second*time.Duration(t))
	defer cancel()

	go func() {
		time.Sleep(time.Second * 3)
		cancel()
	}()

	select {
	case done := <-ctx.Done():
		fmt.Printf("TestWTimeout.done: %v, error: %v\n", done, ctx.Err())
	case e := <-time.After(time.Second * time.Duration(4)):
		fmt.Printf("TestWTimeout: %v", e)
	}
}
