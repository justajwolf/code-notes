# ssh基本命令



## 1.配置和问题整理

- [常见配置](./config.md)
- [FAQ](./issues.md)

## 2. 生成ssh公私钥

```shell
$ ssh-keygen -t rsa -C "youremail@example.com"
```
## 3. ssh 指定地址测试

- 测试ssh是否可以连接到github

```shell
ssh -T git@github.com
Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.
```
- 查看ssh状态连接的整个过程debug日志

```shell
ssh -v git@github.com
```

## 4. ssh 文件传递

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
