# NFS (网络文件系统)

> 注：以系统ubuntu 22.04 为例，假设当前为root用户

## 搭建 NFS 服务端

  ```bash
  # 更新软件包
  apt-get update
  
  # 安装nfs服务
  apt-get install nfs-kernel-server -y
  
  # 编辑/etc/exports配置文件，根据例子配置
  vim /etc/exports
  
  # 具体配置参数详细文档，见下面命令
  man 5 exports
  
  # 重启nfs服务，配置生效
  /etc/init.d/nfs-kernel-server restart
  
  # 查看当前nfs已配置生效的目录
  showmount -e
  ```

## Windows 系统挂载 NFS 目录

```powershell
# 使用cmd执行格式：mount -o anon <nfs远程目录> <本地映射的磁盘名>，例：
mount -o anon \\10.200.1.1\mnt\vms g:
```
