#  ssh 常见问题(FAQ)

## 1. ssh连接github超时

- 问题描述：

  ```tex
  # 使用ssh连接github时出现
  ssh: connect to host github.com port 22: Connection timed out 
  ```

- 可能原因：

  这种问题就是ssh默认端口22阻塞了

- 解决办法：

  - 编辑~/.ssh/config，换一个端口号试试，将如下内容添加到config中：

    ```tex
    Host github.com
        User git
        Hostname ssh.github.com
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/id_rsa
        Port 23
    ```

