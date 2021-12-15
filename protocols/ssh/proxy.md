## ssh代理
```
vi ~/.ssh/config
加入如下配置
host github.com
    ProxyCommand /usr/bin/nc -X connect -x <ip>:<port> %h %p
```

## wsl中ssh代理(wsl动态更新windows父系统的ip，使用其代理)
```
vi ~/.ssh/config 加入如下配置
host github.com
    ProxyCommand /usr/bin/nc -X connect -x 127.0.0.1:1080 %h %p

vi ~/up_ssh_github_proxy.sh
    export winip=$(ip route | grep default | awk '{print $3}')
    export wslip=$(hostname -I | awk '{print $1}')
    sed -i  "s/ProxyCommand.*$/ProxyCommand nc -v -x ${winip}:1080 %h %p/" ~/.ssh/config

# shell启动前加载顺序：/etc/profile -> ~/.bash_profile -> ~/.bashrc -> /etc/bashrc -> ~/.bash_logout
vi ~/.bashrc 添加上面的脚本，进入wsl时候，会加载~/.bashrc文件，脚本就会自动执行
    ~/up_ssh_github_proxy.sh
```