## Cmd/Powershell 问题集

### 问题1
> 问题描述：

* wsl: 参考的对象类型不支持尝试的操作。

> 解决办法：

```shell
# 管理员身份打开cmd/powershell，执行如下命令
$ netsh winsock reset
```