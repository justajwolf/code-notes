# 安装k8s-ubuntu/debian发行版 
> 注：以下命令都假设，当前为root用户

## 安装 kubeadm kubelet kubectl
- cli简介
  - kubeadm：用来初始化集群的指令
  - kubelet：在集群中的每个节点上用来启动 Pod 和容器等
  - kubectl：用来与集群通信的命令行工具
- 更新 apt 包索引并安装使用 Kubernetes apt 仓库所需要的包
  - apt-get update
  - apt-get install -y apt-transport-https ca-certificates curl

- 使用aliyun包密钥
  - curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -

- 添加Kubernetes apt 仓库
  - cat << EOF > /etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF

- 安装 kubelet kubeadm kubectl，并锁定其版本
  - apt-get install -y kubelet kubeadm kubectl
  - apt-mark hold kubelet kubeadm kubectl

## docker 运行时安装

### 官方教程
  - [[ubuntu](https://docs.docker.com/engine/install/ubuntu/)]
  - [[debian](https://docs.docker.com/engine/install/debian/)]
### 错误/警告
  - docker info 会显示 WARNING: No swap limit support
    - 编辑/etc/default/grub，给GRUB_CMDLINE_LINUX配置添加 cgroup_enable=memory swapaccount=1 参数
      - vim /etc/default/grub
    - 保存文件更新
      - update-grub
    - 重启电脑
      - reboot
## kubeadm 创建集群

- 创建控制平面节点
  - kubeadm init [[文档地址](https://kubernetes.io/zh/docs/reference/setup-tools/kubeadm/kubeadm-init/)]
    - 前置配置
      - 忽略swap(不清楚为啥，总是提示不支持swap)
        - echo 'KUBELET_EXTRA_ARGS="--fail-swap-on=false"' > /etc/default/kubelet
    - 使用alilyun镜像，初始化(忽略swap错误)
      - kubeadm init --kubernetes-version [k8s版本号] --image-repository registry.aliyuncs.com/google_containers --ignore-preflight-errors Swap
    - 报错排查(只要出现任何报错，执行kubeadm reset重置上次的init)
      - docker的cgroup-driver与kubelet的不一致
        - 查看各自cgroup-driver
          - docker info | grep "Cgroup D" | cut -d" " -f4
          - cat /var/lib/kubelet/config.yaml | grep cgroupDriver | cut -d" " -f2
        - 解决办法：修改docker的cgroup-driver为systemd(假设kubelet的为systemd)
          - vim /etc/docker/daemon.json // 添加配置项 "exec-opts": ["native.cgroupdriver=systemd"]
          - systemctl restart docker
          - docker info | grep "Cgroup D" | cut -d" " -f4
        