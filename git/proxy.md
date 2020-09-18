## http代理
```
git config --global http.https://github.com.proxy socks5://10.200.250.32:1080
git config --global https.https://github.com.proxy socks5://10.200.250.32:1080
```
## ssh代理
```
vi ~/.ssh/config
加入如下配置
host github.com
    ProxyCommand /usr/bin/nc -X connect -x 10.200.250.32:1080 %h %p
```