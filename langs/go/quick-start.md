# 快速开始

## 下载安装

从官网[下载](https://golang.org/dl/)对应的操作系统版本

- 当前以linux为例，mac注意m1的选择drawin-arm64

```bash
# wget 下载文件
$ wegt [url] -O [dist/filename] 
$ wget https://golang.org/dl/go1.16.7.linux-amd64.tar.gz -O ./go.tar.gz

# curl 下载文件
$ curl [url] -o [dist/filename]
$ curl https://golang.org/dl/go1.16.7.linux-amd64.tar.gz -o ./go.tar.gz
```

- 先清理/usr/local/go，然后解压到/usr/local，一般都放在/usr/local目录下

```bash
$ rm -rf /usr/local/go
$ tar -C /usr/local -xzf go.tar.gz
```

- path配置go命令路径

```bash
# mac配置go
$ echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.zshrc
$ source ~/.zshrc

# linux配置go
$ echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
$ source ~/.bashrc

# 验证是否安装成功
$ go version
```

## 环境变量

- 需要了解各个环境变量，具体见[官方文档]()，shell命令查看，如下：

```bash
# 命令行查看各个环境变量解释
$ go help environment
# 查看当前go的环境变量
$ go env 
# 设置变量值
$ go env -w [varname]=[value]
# 取消变量值
$ go env -u [varname]
```

- 设置常用环境变量

```bash
# 访问公共镜像，用国内代理快
$ go env -w GOPROXY=https://goproxy.io,direct
# 开启模块，文档地址：https://golang.org/ref/mod#mod-commands
$ go env -w GO111MODULE=on
```

!> 如果使用gitlab代码，需要配置私有仓，即，go env -w GOPRIVATE=gitlab.xxx.xx

!> 非原生包命令，临时文件，以及缓存路径都在GOPATH下，默认~/go

# 安装依赖包

- 安装包命令：go get

```bash
# 安装当前目录下的所有依赖(默认通过 https 方式拉取代码)
$ go get .
# 安装指定依赖包
$ go get [package-path]
```

- git地址替换，避免拉取依赖包时输密码

```bash
# ssh
$ git config --local url."git@gitlab.xxx.xx:".insteadOf "https://gitlab.xxx.xxx"

# gitlab，token在gitlab上获取，read权限就可以
$ git config --local url."https://<gitlab-name>:<gitlab-token>@gitlab.17zuoye.net/".insteadOf "https://gitlab.17zuoye.net/"

# github, token在github上获取
$ git config --local url."https://<githab-token>:x-oauth-basic@github.com/".insteadOf "https://github.com/"
```

# 创建并编译运行go项目

参考[官方示例](https://golang.org/doc/tutorial/web-service-gin)，以下示例repo，见[仓库](https://github.com/justajwolf/go-dev/tree/master/web-service-gin)
- 切换到~目录创建，demo文件夹

```bash
# 切换到当前用户目录(自己随便找个位置就行)
$ cd ~
# 创建module的根目录名，这个一般与module名保持一致，为了更友好的识别度
$ mkdir web-service-gin
```
- 初始化demo模块

```bash
# 初始化module path
$ go mod init example.com/web-service-gin
# 重定向module path到local path
$ go mod edit -replace example.com/web-service-gin=./
```

- 安装依赖包

```bash
# 安装gin这个包
$ go get github.com/gin-gonic/gin
```

- 创建albums包及albums.go文件

!> 每个包独立一个文件夹，即albums/albums.go, 文件名没具体限制，最好叫的容易区分

```go
package albums

import (
	"net/http"
	"github.com/gin-gonic/gin"
)

type album struct {
	ID     string  `json:"id"`
	Title  string  `json:"title"`
	Artist string  `json:"artist"`
	Price  float64 `json:"price"`
}

var albums = []album{
	{ID: "1", Title: "aaaaaa", Artist: "51f-1", Price: 56.99},
	{ID: "2", Title: "bbbbbb", Artist: "51f-2", Price: 66.99},
	{ID: "3", Title: "cccccc", Artist: "51f-3", Price: 76.99},
}

func GetAlbums(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, albums)
}

func PostAlbums(c *gin.Context) {
	var newAlbum album
	if err := c.BindJSON(&newAlbum); err != nil {
		return
	}

	albums = append(albums, newAlbum)
	c.IndentedJSON(http.StatusOK, newAlbum)
}

func GetAlbumByID(c *gin.Context) {
	id := c.Param("id")
	for _, a := range albums {
		if a.ID == id {
			c.IndentedJSON(http.StatusOK, a)
			return
		}
	}
	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "album not found!"})
}

```

- 创建入口文件，可执行包(main.go)

```go
package main

import (
	"example.com/web-service-gin/albums"
	"github.com/gin-gonic/gin"
)

func main() {
	// gin.SetMode(gin.ReleaseMode)
	router := gin.Default()
	router.GET("/albums", albums.GetAlbums)
	router.POST("/albums", albums.PostAlbums)
	router.GET("/albums/:id", albums.GetAlbumByID)
	router.Run()
}
```

- 运行当前module

1.编译和运行一起执行

```bash
# 直接编译并执行main包的main函数
$ go run .
```

 2.先编译，后执行

```bash
# 编译成二进制，默认是当前module名
$ go build .
# 执行二进制文件
$ ./web-service-gin
```