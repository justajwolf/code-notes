[文档地址](https://docs.docker.com/engine/daemon/proxy/)
## Configure the Docker daemon

### Daemon configuration 

/etc/docker/daemon.json

```json
{
    "registry-mirrors": [
        "https://docker.1ms.run",
        "https://docker-0.unsee.tech",
        "https://docker.m.daocloud.io"
    ],
    "live-restore": true,
    "features": { "buildkit": true },
    "proxies": {
        "http-proxy": "http://proxy.example.com:port",
        "https-proxy": "https://proxy.example.com:port",
        "no-proxy": "localhost,127.0.0.1"
    }
}
```

## systemd unit file

### 1.Create a systemd drop-in directory for the docker service:

```bash
sudo mkdir -p /etc/systemd/system/docker.service.d
```

### 2.Create a file named `/etc/systemd/system/docker.service.d/http-proxy.conf`

```toml
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:port"
Environment="HTTPS_PROXY=https://proxy.example.com:port"
Environment="NO_PROXY=localhost,127.0.0.1"
```

### 3.Flush changes and restart Docker

```bash
sudo systemctl daemon-reload
sudo systemctl restart docker
```
