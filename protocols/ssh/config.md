# ssh 常见配置 <!-- {docsify-ignore} -->

## 1. ssh配置免密登录

- 将本地的id_rsa.pub公钥，添加到server端的~/.ssh/authorized_keys文件中

  ```bash
  ssh-copy-id -i ~/.ssh/id_rsa.pub [user]@[ip]
  ```
- 编辑本地配置文件，~/.ssh/config，添加如下内容：

  ```
  # 自定义host，随便写，怎样短易于识别怎么写
  Host [自定义host]
      User [user]
      Hostname [server ip/域名]
      PreferredAuthentications publickey
      IdentityFile ~/.ssh/id_rsa
  ```

- 假如 自定义host => aliyun，直接 ssh aliyun 即可。

## 2. ssh服务端禁用密码登录

- 编辑ssh服务端配置，/etc/ssh/sshd_config

  ```
  # 密码认证，设置关闭
  PasswordAuthentication no
  
  # 启用密钥认证
  RSAAuthentication yes
  
  # 启用公钥认证, 默认开启
  PubKeyAuthentication yes
  # 配置公钥证书数据文件位置, 默认位置是.ssh/authorized_keys，可以更改位置
  AuthenticationKeysFile .ssh/authorized_keys
  
  # 允许root用户登录
  PermitRootLogin yes
  ```

- 重启ssh服务，即可

  ```bash
  service ssh restart
  ```

## 3. ssh代理配置

### 3.1 linux/osx中，ssh代理配置

- 编辑~/.ssh/config，举例github，加入如下配置：

  ```
  # 使用ip:port地址代理，一般是socks5代理
  host github.com
      ProxyCommand /usr/bin/nc -X connect -x <ip>:<port> %h %p
  ```

### 3.2 wsl中，ssh代理配置，使用windows中的代理地址

- 简单说明下原因和思路：
  - wsl2不是直接使用物理网卡，而是通过windows专门为wsl创建的虚拟网卡进行网络访问，windows每次开机重启，这个虚拟网卡会被删掉重新创建，所以子网ip会变，不是固定的。
  - shell启动前加载顺序：/etc/profile -> ~/.bash_profile -> ~/.bashrc -> /etc/bashrc -> ~/.bash_logout
  - 我们只需要将更新脚本，放到~/.bashrc中执行，终端进入wsl时候，会加载~/.bashrc文件，脚本就会自动执行。

- 第一步，同上，替换<port>为代理的端口号，<ip>为windows的ip，获取方式如下：

  ```bash
  cat /etc/resolv.conf | grep nameserver | awk '{print $2}'
  ```

- 第二步，编写一个进入shell时，用于查询winip，并更新到ssh代理配置上

  ```bash
  # 创建更新ssh代理脚本
  cat << EOF > ~/up_ssh_proxy.sh
  export winip=$(ip route | grep default | awk '{print $3}')
  export wslip=$(hostname -I | awk '{print $1}')
  sed -i  "s/ProxyCommand.*$/ProxyCommand nc -v -x ${winip}:1080 %h %p/" ~/.ssh/config
  EOF
  
  # 将上面的脚本执行命令 追加到 ~/.bashrc文件末尾
  echo "\n\. ~/up_ssh_github_proxy.sh" >> ~/.bashrc 
  ```