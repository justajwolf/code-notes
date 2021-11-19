# shell命令

## **linux/osx**

### 查看系统版本
- cat /proc/version
- cat /etc/os-release

### 查看所有用户和用户组信息
- cat /etc/passwd
- cat /etc/group

### 给用户赋予root权限
- sudo usermod -g root jwolf

### 给hosts添加写权限
- sudo chmod a+w hosts

### 用户身份权限
- sudo - 超级用户执行(super user do)
- su - 切换用户(switch user)
- 临时获取root部分权限
  - su root
- 切换成root用户
  - su - root
- 临时获取root用户，执行一个命令
  - su root -c [cmd]

### 磁盘管理(假设当前root用户)
- 检查文件系统的磁盘空间占用情况
  - df -hT [目录或文件名]
- 查看文件和目录磁盘空间使用情况
  - du -h [目录或文件名]
- 查看磁盘分区信息
  - fdisk -l [磁盘名]
- 管理指定磁盘分区
  - fdisk [磁盘名]
- 查看mkfs已知支持分区格式
  - mkfs[tab][tab]
- mkfs格式化磁盘分区格式
  - mkfs -t [ntfs/ext4] [分区名]
- 配置指定挂载点，开放共享
  - mount --make-share [挂载点]
- 配置指定分区，挂载点到对应挂载点
  - mount -t [ntfs/ext4] [分区名] [挂载点]
- 卸载指定挂载点
  - unmount [-fn] [挂载点]
- 查看已挂载的所有设备
  - cat /proc/mounts

### 更换阿里镜像源
- sed -i 's_http://deb.debian.org_http://mirrors.aliyun.com_g' /etc/apt/sources.list
- sed -i 's_http://security.debian.org_http://mirrors.aliyun.com_g' /etc/apt/sources.list

### 换https源前，先安装公共证书
- sudo apt update
- sudo apt install apt-transport-https ca-certificates

### 安装vim，telnet，ifconfig，ping命令 
- sudo apt install telnet net-tools iputils-ping -y

## **docker**

### 镜像导入
- docker load < {images.tar}
- docker load --input {images.tar}

## **wsl**

### 重启wsl
- net stop lxssmanager
- net start lxssmanager

### wsl2中获取主机IP
- ip route | grep default | awk '{print $3}'
- cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }'
