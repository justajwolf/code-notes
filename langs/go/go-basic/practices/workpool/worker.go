package main

import (
	"fmt"
	"sync"
	"time"
)

type Worker struct {
	// private
	mux   sync.Mutex
	id    int
	state State
	exit  chan bool
	done  func()

	// public
	WorkPoolSend chan<- (chan<- Job)
	JobChan      chan Job
}

func NewWorker(id int, pool chan<- (chan<- Job), done func()) *Worker {
	return &Worker{
		mux:   sync.Mutex{},
		id:    id,
		state: OFF,
		exit:  make(chan bool),
		done:  done,

		WorkPoolSend: pool,
		JobChan:      make(chan Job),
	}
}

func (w *Worker) Start() *Worker {
	w.mux.Lock()
	defer w.mux.Unlock()

	if w.state == ON {
		return w
	}

	go func() {
		for {
			w.WorkPoolSend <- w.JobChan
			fmt.Print("")
			select {
			case job := <-w.JobChan:
				fmt.Printf("Receive job: %v\n", job)

				time.Sleep(time.Second * 5)
			case <-w.exit:
				w.done()
				return
			}
		}
	}()
	w.state = ON
	return w
}

func (w *Worker) Stop() {
	w.mux.Lock()
	defer w.mux.Unlock()

	if w.state == OFF {
		return
	}

	close(w.exit)
	w.state = OFF
}
