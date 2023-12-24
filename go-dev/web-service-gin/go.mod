module github.com/justajwolf/go-dev/web-service-gin

go 1.16

require (
	github.com/justajwolf/go-dev/go-basic v0.0.0-00010101000000-000000000000
	github.com/gin-gonic/gin v1.7.2
)

replace github.com/justajwolf/go-dev/go-basic => ../go-basic

replace github.com/justajwolf/go-dev/web-service-gin => ./
