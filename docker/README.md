# [Docker](https://docs.docker.com/reference/)

日常开发中常用的 Docker 环境与配置，全部以 `docker compose` 组织，可直接复用或按需裁剪。

## 目录

| 目录 | 说明 |
| --- | --- |
| `basic-services/` | 基础设施编排：nginx、mysql、mongo、redis、gitlab-runner、portainer，以及独立的 kafka |
| `claws/` | AI Agent 服务：zeroclaw、openclaw |
| `elastic-stack/` | Elasticsearch + Kibana + Filebeat 日志检索 |
| `log-server/` | Node + TypeScript 日志服务示例，含 Dockerfile 写法 |
| `office/` | Windows 容器内安装 Office（实验性） |
| `notes/` | docker cli、代理、容器访问宿主机域名等碎片笔记 |
| `vm.sh` | docker-machine 调整 `vm.max_map_count`，ES 启动前置 |

## 基础服务 basic-services

```bash
cd docker/basic-services
docker compose up -d          # 启动全部
docker compose up -d nginx    # 只启动某个服务
```

### 服务与端口

| 服务 | 容器名 | 宿主机端口 | 说明 |
| --- | --- | --- | --- |
| nginx | nginx | 80 / 443 | 反向代理入口，同时接入 `basic`、`elastic` 网络 |
| mysql-5.7 | mysql | 3306 | root 密码 `123456`，仅作本地开发 |
| mongo | mongo | 27017 | 配置见 `mongo/mongod.conf`，默认关闭鉴权、监听 `0.0.0.0` |
| redis | redis | 6379 | 挂载 `redis/redis.conf`，数据目录 `redis/data` |
| gitlab-runner | gitlab-runner | 8093 | GitLab CI Runner |
| portainer | portainer | 9000 | 容器管理面板 |

网络约定：compose 自建 `basic`、`elastic` 两个 bridge 网络，其他 compose 通过 `external: true` 复用。

### nginx

- `nginx/conf.d/`：HTTP 站点配置，挂载到 `/etc/nginx/conf.d`。其中 `openclaw.conf`、`zeroclaw.conf` 分别把 `openclaw.jpc-hp`、`zeroclaw.jpc-hp` 反代到宿主机的 `18789`、`42617` 端口。
- `nginx/conf.tcp.d/`：四层代理，挂载到 `/etc/nginx/conf.tcp.d`，由 `nginx.conf` 里的 `stream` 块加载。mysql / mongo / redis 的配置默认注释，需要时取消注释即可，k8s 的 443 已开启并转发到 `127.0.0.1:30443`。
- 容器要访问宿主机服务，compose 里已声明 `extra_hosts: host.docker.internal:host-gateway`，用法见 [配置容器内置，宿主机域名](/docker/notes/docker-host-domain.md)。
- `nginx/sources.list`、`ubuntu.sources.list` 提供国内 apt 源，按需替换。

### kafka

Kafka 单独放在 `basic-services/docker-compose.kafka.yaml`，一个 zookeeper + 两个 broker：

```bash
docker compose -f docker-compose.kafka.yaml up -d
```

| 服务 | 宿主机端口 |
| --- | --- |
| zookeeper | 2189 |
| kafka01 | 9992 |
| kafka02 | 9993 |

`KAFKA_CFG_ADVERTISED_LISTENERS` 使用 `kafka01:9992`、`kafka02:9993`，本机需要先把这两个域名指向对应 IP 才能从宿主机访问。

### ngrok

把本机端口以 https 隧道暴露出去，容器使用 host 网络，默认转发 `NGROK_TARGET`（默认 `8080`），并绑定 `NGROK_DOMAIN` 指定的固定域名。

```bash
cd docker/basic-services
cp .example.env .env    # 填入 NGROK_AUTHTOKEN、NGROK_DOMAIN、NGROK_TARGET
docker compose --profile ngrok up -d
docker compose logs -f ngrok   # 确认 Forwarding 地址
```

- 固定域名：到 [Domains](https://dashboard.ngrok.com/domains) 创建（免费账号可创建 1 个静态域名），把完整域名填到 `NGROK_DOMAIN`，如 `xxx.ngrok-free.app`。
- 同样放在 `ngrok` profile 中，不会随 `docker compose up -d` 一起启动。
- 本地管理界面 `http://localhost:4040`，可查看请求记录并重放，host 网络下直接访问即可。
- 多隧道：复制 `ngrok` 服务，改服务名、`container_name`、`NGROK_DOMAIN` 和 `NGROK_TARGET`。

## AI Agent claws

`claws/docker-compose.yaml` 包含两个服务：

| 服务 | 端口 | 数据目录 | 说明 |
| --- | --- | --- | --- |
| zeroclaw | 42617 | `~/.zeroclaw` | 以 `UID:GID` 运行，避免挂载目录权限问题 |
| openclaw | 18789 | `~/.openclaw` | 需要 `OPENCLAW_GATEWAY_TOKEN`，带 `/healthz` 健康检查 |

依赖 `basic` 网络（外部网络，需先启动 basic-services），访问入口由 nginx 的 `openclaw.conf`、`zeroclaw.conf` 提供。

```bash
cp .example.env .env   # 填入 OPENCLAW_GATEWAY_TOKEN
cd docker/claws && docker compose up -d
```

首次部署涉及目录初始化、配置调整和重启，建议直接用根目录脚本：

```bash
./mgr.sh deployOpenClaw
./mgr.sh deployZeroClaw
```

## 日志检索 elastic-stack

ES 7.12.1 + Kibana + Filebeat，三个 compose 分别位于 `elasticsearch/`、`kibana/`、`filebeat/`，共用外部网络 `elastic`。

```bash
# 1. 宿主机内核参数（ES 要求 vm.max_map_count >= 262144）
./docker/vm.sh

# 2. 创建网络
bash ./docker/elastic-stack/net.sh

# 3. 按顺序启动
cd docker/elastic-stack/elasticsearch && docker compose up -d
cd ../kibana && docker compose up -d
cd ../filebeat && docker compose up -d
```

- ES 端口 `9200`、`9300`；compose 内同时定义了单节点 `es` 和三节点集群 `es01~es03`，按需启停。
- Kibana 端口 `5601`，通过 `http://es:9200` 连接 ES。
- Filebeat 以 root 运行并挂载 `/var/lib/docker/containers` 与 `docker.sock`，用于采集容器日志，配置见 `filebeat/filebeat.yml`。

## log-server

Node + TypeScript 写的日志服务示例：随机输出 JSON 日志，用于演示 Dockerfile 与 compose 编排。

```bash
cd docker/log-server
npm run d:start   # 构建镜像并启动
npm run d:logs    # 查看日志
```

端口 `8080` 映射容器内 `3000`。compose 使用外部网络 `elastic`，注意启动顺序。

## office

基于 `windows/servercore:ltsc2022`，通过 Office Deployment Tool 在容器里安装 Office，并用 PowerShell 验证 Word COM 组件。

- 只能在 Windows 宿主机（Windows 容器模式）下构建。
- `office/config.xml` 是 ODT 配置文件，构建前需按需填写产品、语言、许可等配置。

## 日常笔记

- [cli 常用操作](/docker/notes/docker-cli.md)
- [proxy 配置](/docker/notes/docker-proxy.md)
- [配置容器内置，宿主机域名](/docker/notes/docker-host-domain.md)
