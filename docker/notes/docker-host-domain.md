## Use Docker Cli Run
[Add entries to container hosts file (--add-host)](https://docs.docker.com/reference/cli/docker/container/run/#add-host)

[Configure host gateway IP](https://docs.docker.com/reference/cli/dockerd/#configure-host-gateway-ip)

> The `--add-host` flag supports a special `host-gateway` value that resolves to the internal IP address of the host. 

> This is useful when you want containers to connect to services running on the host machine.

> It's conventional to use `host.docker.internal` as the hostname referring to `host-gateway`. 

```bash
$ echo "hello from host!" > ./hello
$ python3 -m http.server 8000
Serving HTTP on 0.0.0.0 port 8000 (http://0.0.0.0:8000/) ...

$ docker run \
  --add-host host.docker.internal=host-gateway \
  curlimages/curl -s host.docker.internal:8000/hello
hello from host!
```

## Configure the Docker Compose Services
[extra_hosts](https://docs.docker.com/reference/compose-file/services/#extra_hosts)

> extra_hosts adds hostname mappings to the container network interface configuration (/etc/hosts for Linux).

```yaml
extra_hosts:
    - host.docker.internal=host-gateway
    - somehost=192.168.1.1
    - host.v6=::1
```
