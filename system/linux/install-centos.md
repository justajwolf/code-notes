## 安装centos 8
```
1.下载iso镜像, 软碟通写到u盘
2.开机启动按e键，修改系统安装目录, hd:/dev/sdb4, 然后ctrl+x保存, 自动进入安装界面
3.根据安装ui进行安装
```
## 开机启动切换(图形模式/命令模式)
```
$ cat /etc/inittab
$ systemctl set-default multi-user.target
$ reboot
```