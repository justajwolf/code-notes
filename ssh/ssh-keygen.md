## 生成sshkey
```
$ ssh-keygen -t rsa -C "youremail@example.com"
```
## 测试ssh是否链接github
```
ssh -T git@github.com

Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.
```