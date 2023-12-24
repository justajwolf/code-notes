package main

import (
	"sync"
)

type Scheduler struct {
	// private
	mux   sync.Mutex
	wg    sync.WaitGroup
	state State

	// public
	WorkerPool chan chan<- Job
	MaxWorkers int
	Workers    []*Worker
}

func NewScheduler(maxWorkers int) *Scheduler {
	s := &Scheduler{
		mux:   sync.Mutex{},
		wg:    sync.WaitGroup{},
		state: OFF,

		WorkerPool: make(chan chan<- Job, maxWorkers),
		MaxWorkers: maxWorkers,
		Workers:    make([]*Worker, maxWorkers),
	}

	for i := 0; i < s.MaxWorkers; i++ {
		s.wg.Add(1)
		w := NewWorker(i, s.WorkerPool, s.wg.Done).Start()
		s.Workers[i] = w
	}

	return s
}

func (s *Scheduler) Run(jobQueue chan Job) {
	s.mux.Lock()
	defer s.mux.Unlock()

	if s.state == ON {
		return
	}

	go func() {
		for todo := range jobQueue {
			go func(job Job) {
				jobChan := <-s.WorkerPool
				jobChan <- job
			}(todo)
		}
	}()

	s.state = ON
}

func (s *Scheduler) Quit() {
	s.mux.Lock()
	defer s.mux.Unlock()

	if s.state == OFF {
		return
	}

	for _, w := range s.Workers {
		w.Stop()
	}
	s.wg.Wait()
	close(s.WorkerPool)

	s.state = OFF
}
