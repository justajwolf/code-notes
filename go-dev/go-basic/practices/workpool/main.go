package main

import (
	"fmt"
	"time"
)

func main() {
	var (
		maxWorkers = 5
		qlen       = 5
		jnum       = 30
	)
	jobQueue := make(chan Job, qlen)
	scheduler := NewScheduler(maxWorkers)
	scheduler.Run(jobQueue)

	time.Sleep(time.Second)

	AddJobToQueue(jobQueue, jnum)

	time.Sleep(time.Second * 10)

	scheduler.Quit()

	time.Sleep(time.Second * 10)

	fmt.Println("end")
}

type Task struct {
	Num int
}

type Job struct {
	Task
}

func AddJobToQueue(jobQueue chan<- Job, jnum int) {
	for i := 0; i < jnum; i++ {
		job := Job{
			Task: Task{
				Num: i,
			},
		}
		jobQueue <- job
		fmt.Printf("Add Job: %v\n", i)

		time.Sleep(time.Second)
	}
}
