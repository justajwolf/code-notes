# 安装k8s-ubuntu/debian发行版 
> 注：以下命令都假设，当前为root用户

## 安装 kubeadm、kubelet 和 kubectl
- kubeadm：用来初始化集群的指令
- kubelet：在集群中的每个节点上用来启动 Pod 和容器等
- kubectl：用来与集群通信的命令行工具


### 1.更新 apt 包索引并安装使用 Kubernetes apt 仓库所需要的包
- apt-get update
- apt-get install -y apt-transport-https ca-certificates curl

### 2.使用aliyun包密钥
- curl https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -

### 3.添加Kubernetes apt 仓库
- cat << EOF > /etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF

### 4.安装 kubelet kubeadm kubectl，并锁定其版本
- apt-get install -y kubelet kubeadm kubectl
- apt-mark hold kubelet kubeadm kubectl