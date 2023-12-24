package main

import (
	"fmt"
	"time"

	"github.com/gin-gonic/gin"
)

func main() {
	app := gin.New()

	app.Use(gin.Logger())
	app.Use(gin.Recovery())
	app.GET("/time", func(c *gin.Context) {
		fmt.Fprintln(c.Writer, time.Now())
	})
	app.Run()
}
