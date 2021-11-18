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

### 配置挂在盘同时，开放共享
- sudo mount --make-share /

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
