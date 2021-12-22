# ssh基本命令



## 配置和问题整理

- [常见配置](./config.md)
- [FAQ](./issues.md)

## ssh-keygen 

> OpenSSH authentication key utility

- 生成ssh公私钥

  ```shell
  ssh-keygen -t rsa -C "youremail@example.com"
  ```

## ssh-keyscan
> gather SSH public keys from servers

- 添加remote机器公钥 => known_hosts，例github:

  ```shell
  ssh-keyscan github.com >> ~/.ssh/known_hosts
  ```

## ssh-copy-id
> use locally available keys to authorise logins on a remote machine

- 将本地公钥，添加到remote的authorized_keys文件中

  ```shell
  ssh-copy-id -i ~/.ssh/id_rsa.pub [user]@[ip]
  ```

## ssh
> OpenSSH remote login client

- 测试ssh是否可以连接到github

  ```shell
  ssh -T git@github.com
  Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.
  ```
- 查看ssh状态连接的整个过程debug日志

  ```shell
  ssh -v git@github.com
  ```
## scp
> OpenSSH secure file copy (文件传输) 

- 假设当前server：

  - 用户名: root

  - server ip：10.100.1.1

  - 假设~/.ssh/config，对当前server配置如下：

    ```tex
    Host selfserver
        User root
        Hostname 10.100.1.1
        PreferredAuthentications publickey
        IdentityFile ~/.ssh/id_rsa
    ```

- 从本地上传文件到server

  ```shell
  # 将本地的a.txt 上传到 远程server的~/a.txt
  scp ./a.txt root@10.100.1.1:~/a.txt
  
  # 因本地~/.ssh/config，有对当前server进行配置自定义host，以及指定User，这块可以省略写为
  scp ./a.txt selfserver:~/a.txt
  ```

- 从server下载文件到本地

  ``` shell
  # 下载远程server的~/b.txt文件 到 本地 ./b.txt
  scp root@10.100.1.1:~/b.txt ./b.txt 
  
  # 因本地~/.ssh/config，有对当前server进行配置自定义host，以及指定User，这块可以省略写为
  scp selfserver:~/b.txt ./b.txt 
  ```
