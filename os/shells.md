# Shell 命令

## **linux/osx**

### 常用命令

- 查看系统版本

  - cat /proc/version
  - cat /etc/os-release

- 查看所有用户和用户组信息

  - cat /etc/passwd
  - cat /etc/group

- 给用户赋予 root 权限

  - sudo usermod -aG root jwolf

- 给 hosts 添加写权限

  - sudo chmod a+w hosts

- 用户身份权限

  - sudo - 超级用户执行(super user do)
  - su - 切换用户(switch user)
  - 临时获取 root 部分权限
    - su root
  - 切换成 root 用户
    - su - root
  - 临时获取 root 用户，执行一个命令
    - su root -c [cmd]

- 换 https 源前，先安装公共证书

  - sudo apt update
  - sudo apt install apt-transport-https ca-certificates

- 安装 vim，telnet，ifconfig，ping 命令
  - sudo apt install telnet net-tools iputils-ping -y

### 常见工具

- curl [详见](https://curl.se/docs/manpage.html)

  - 下载文件

    ```bash
    # 下载url的文件到当前目录，保留远处的文件名
    curl -O [url]

    # 下载url的文件到当前目录，使用本地的文件名
    curl -o [本地文件名] [url]

    # 下载url不是最终的文件地址，需要重定向下载，加上(-L/--location)参数
    curl -o [本地文件名] [url] -L
    ```

  - 访问对于自签证书测试 https，忽略证书警告，允许不使用证书到 SSL 站点
    ```bash
    # -k 或 --insecure
    curl -k [https:url]
    curl --insecure [https:url]
    ```

### 文件编辑/管理

- tee
  - 从标准输入设备读取数据，将其内容输出到标准输出设备，同时保存成文件
    - tee [-a] [文件名]
- sed
  - 直接参数
    - -i: 直接修改源文件
    - -n: 只打印命令执行后的结果
  - 插入行到指定行前
    - sed -i '[行号]i[行内容]' [文件名]
  - 插入行到指定行后
    - sed -i '[行号]a[行内容]' [文件名]
  - 搜索替换(分隔符好像没有啥具体限制，下面使用的/，也可以使用#和其它的)
    - sed -i 's/[目标内容]/[替换内容]/' [文件名]
    - sed -i 's/[目标内容]/[替换内容]/g' [文件名]
  - 查看指定行区间数据
    - sed -n '[开始行号],[结束行号]p' [文件名]
    - sed -n '[开始行号],[结束行号]!p' [文件名]
    - sed -n '[行号 1]p;[行号 2]p' [文件名]
  - 删除行
    - sed -i '[行号]d' [文件名]
  - 替换指定行区间数据
    - sed -n '[开始行号],[结束行号]c[替换内容]' [文件名]
  - 文件末尾追加行
    - sed -i '$a[追加内容]' [文件名]

### 网络管理

- netstat - 查看显示网络状态
- ip - 显示或配置网络工具
- iptables - 配置预处理数据包规则 (过滤/网络地址转换/包修改/跟踪)

### 磁盘管理/维护

- df
  - 检查文件系统的磁盘空间占用情况
    - df -hT [目录或文件名]
- du
  - 查看文件和目录磁盘空间使用情况
    - du -h [目录或文件名]
- fdisk
  - 查看磁盘分区信息
    - fdisk -l [磁盘名]
  - 管理指定磁盘分区
    - fdisk [磁盘名]
- mkfs
  - 查看 mkfs 已知支持分区格式
    - mkfs[tab][tab]
  - mkfs 格式化磁盘分区格式
    - mkfs -t [ntfs/ext4] [分区名]
- mount/unmont
  - 配置指定挂载点，开放共享
    - mount --make-share [挂载点]
  - 配置指定分区，挂载点到对应挂载点
    - mount -t [ntfs/ext4] [分区名] [挂载点]
  - 卸载指定挂载点
    - umount [-fn] [挂载点]
- 查看已挂载的所有设备
  - cat /proc/mounts
- 开机自动挂载指定设备
  - 查看系统所有设备块得信息，找到需要挂载的设备信息
    - blkid
  - 查看当前已配置挂载的信息
    - cat /etc/fstab
  - 编辑/etc/fstab，照抄一个已挂载的格式，填入 blkid 查到的信息
    - vim /etc/fstab
  - 重启电脑
    - reboot

## **ubuntu/debian**

### 更换阿里镜像源

- sed -i 's_http://deb.debian.org_http://mirrors.aliyun.com_g' /etc/apt/sources.list
- sed -i 's_http://security.debian.org_http://mirrors.aliyun.com_g' /etc/apt/sources.list

### apt-mark - 对软件包进行设置(手动/自动)安装标记

- 标记指定软件包为自动安装
  - apt-mark auto [package]
- 标记指定软件包为手动安装
  - apt-mark manual [package]
- 将 meta 包的所有依赖项标记为自动安装
  - apt-mark minimize-manual [package]
- 标记指定软件包为保留(held back)，阻止软件自动更新
  - apt-mark hold [package]
- 取消指定软件包的保留(held back)标记，解除阻止自动更新
  - apt-mark unhold [package]
- 列出所有自动安装的软件包
  - apt-mark showauto [package]
- 列出所有手动安装的软件包
  - apt-mark showmanual [package]
- 列出设为保留的软件包
  - apt-mark showhold [package]

### apt-key - 包密钥管理工具

- 把下载的 key 添加到本地 trusted 数据库中
  - apt-key add key
- 从本地 trusted 数据库删除 key
  - apt-key del key
- 列出已保存在系统中 key
  - apt-key list
- 更新本地 trusted 数据库，删除过期 key
  - apt-key update

### apt - 包管理工具(Advanced Packaging Tool)

- 列出所有可更新的软件 list
  - apt update
- 升级软件包
  - apt upgrade
- 列出可更新的软件包及版本信息
  - apt list --upgradeable
  - apt list --installed
  - apt list --all-versions
- 升级软件包，升级前先删除需要更新软件包
  - apt full-upgrade
- 安装指定 package
  - apt install [package]
  - apt install [package1] [package2] [package3]
- 更新指定 package
  - apt update [package]
- 显示软件包具体信息
  - apt show [package]
- 删除指定 package
  - apt remove [package]
- 清理不再使用的依赖和库文件
  - apt autoremove
- 移除软件包及配置文件
  - apt purge [package]
- 查找软件包命令
  - apt search [keyword]

## **docker**

### ubuntu安装

脚本快速安装
- curl -fsSL https://get.docker.com -o get-docker.sh
- sudo sh get-docker.sh

手动尝试命令
- sudo systemctl enable docker.service
- sudo systemctl enable containerd.service
- sudo usermod -aG docker $USER
- newgrp docker

### 镜像导入

- docker load < {images.tar}
- docker load --input {images.tar}

## **wsl**

### 重启 wsl

- net stop lxssmanager
- net start lxssmanager

### wsl2 中获取主机 IP

- ip route | grep default | awk '{print $3}'
- cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }'
