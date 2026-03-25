## logs

> 1.查看容器日志

```bash
# 例：container name is logger
docker logs -f logger
```

## build

> 1.打标签(多个)

```bash
docker build -t log-server:0.0.1 -t log-server:latest .
```

> 2.使用指定 Dockerfile

```bash
docker build -f /path/Dockerfile -t log-server:0.0.2 .
```

## rm

> 1.强制删除容器

```bash
# 强制删除(包括正在运行)容器
docker rm --force loger
```

## run

> 端口映射

```bash
# -p --publish
docker run -p 8080:7070 mysql:latest
```

> 后台运行

```bash
# -d --detach
docker -d mysql:lastet
```

## image

> 镜像本地批量导出

```bash
docker images | grep -v REPOSITORY | awk 'BEGIN{OFS=":";ORS=" "}{print $1,$2}'
```

```bash
docker save -o images.tar $(docker images | grep -v REPOSITORY | awk 'BEGIN{OFS=":";ORS=" "}{print $1,$2}')
```

```bash
docker save -o images.tar $(docker images --format "{{.Repository}}:{{.Tag}}")
```

```bash
docker save $(docker images --format "{{.Repository}}:{{.Tag}}") > images.tar
```

> 镜像导入

```bash
docker load --input images.tar
```

```bash
docker load --i images.tar
```

```bash
docker load < images.tar
```

> 批量删除缓存镜像

```bash
docker image rm -f `docker images | grep "<none>" | awk 'BEGIN{OFS=":";ORS=" "}{print $3}'`
```

```bash
docker rmi $(docker images -f "dangling=true" -q)
```

## compose

> 启动 service

```bash
# 使用默认：docker-compose.yaml
docker compose up -d logger

# 使用指定compose文件启动
docker compose -f xxx.yaml up -d logger
```

## dockerfile

> [文档地址](https://docs.docker.com/engine/reference/builder/)

```docker
FROM node:current-slim
WORKDIR /usr/src/app
COPY package.json ./
```
