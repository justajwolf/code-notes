## ssh连接github超时
```
问题：ssh: connect to host github.com port 22: Connection timed out #使用ssh连接github时,出现timeout
症状：这种问题就是ssh阻塞了22端口。
办法：
    cd ~/.ssh/
    touch config
    将如下内容添加到config中（当然，在全局文件中也是添加相同的内容）：
    Host github.com
    User git
    Hostname ssh.github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa
    Port 443
```