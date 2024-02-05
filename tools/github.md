# GitHub问题

## 静态资源加速（jsDelivr）

[jsDelivr](https://www.jsdelivr.com/) ： 一个 免费 cdn，加速 github 的 usercontent 数据。

对于想使用github 仓库，作为 图库 或 静态资源库的玩家，可供 Try a Try。

### GitHub地址 <=> CDN地址

**origin** : <https://raw.githubusercontent.com/justajwolf/code-notes/master/README.md>

**cdnurl** : <https://cdn.jsdelivr.net/gh/justajwolf/code-notes@master/README.md>

### 重置CDN缓存

```bash
curl https://purge.jsdelivr.net/gh/justajwolf/code-notes@master/README.md
```

## 解决访问 Timeout

### Try a Try 的解决办法

- 方式一：花点米，上梯子，(全局/PAC)代理

- 方式二：本地host，配置github.com的最近静态ip
  - 这是最简单的快速有效的办法，去哪找能用的IP呢，往👇👇看

### 关于可用的 IP 地址

这里GitHub官方有专门的文档说明，详见 => [关于 GitHub 的 IP 地址](https://docs.github.com/zh/authentication/keeping-your-account-and-data-secure/about-githubs-ip-addresses)。

耐心看完文档，可以了解到，`github.com` 域名解析出来的未被封禁的 IP 是允许使用 TCP 端口 22、80 和 443这仨端口，进行访问。

- 找 GitHub 的可用 IP，就戳这 => [GitHub 的 IP 地址列表](https://api.github.com/meta)，随缘找一个能ping通的，看着顺眼的，配置到本地host，呜呼，不Timeout啦~

- 对于 SSH 连接 Timeout 时，可以先尝试，修改本地SSH配置，将默认端口改为443，Try a Try，往👇👇看
  - 编辑 ~/.ssh/config

    ```text
    Host github.com
        HostName ssh.github.com
        # Port 22
        Port 443
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/id_rsa
    ```

  - Github文档引用，戳这 => [在 HTTPS 端口使用 SSH](https://docs.github.com/zh/authentication/troubleshooting-ssh/using-ssh-over-the-https-port)
