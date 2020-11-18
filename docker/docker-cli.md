## logs
> 1.查看容器日志
```
docker logs -f logger
```

## build
> 1.打标签(多个)
```
docker build -t log-server:0.0.1 -t log-server:latest .
```
> 2.使用指定Dockerfile
```
docker build -f /path/Dockerfile -t log-server:0.0.2 .
```

## rm
> 1.强制删除容器
```
// 强制删除(包括正在运行)容器
docker rm --force loger
```

## run
> 端口映射
```
// -p --publish
docker run -p 8080:7070 mysql:latest
```
> 后台运行
```
// -d --detach
docker -d mysql:lastet
```

## image
> 镜像本地批量导出
```
1.docker images | grep -v REPOSITORY | awk 'BEGIN{OFS=":";ORS=" "}{print $1,$2}'
2.docker save -o 123.tar `docker images | grep -v REPOSITORY | awk 'BEGIN{OFS=":";ORS=" "}{print $1,$2}'`
```