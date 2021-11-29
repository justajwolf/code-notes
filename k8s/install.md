# 使用kubeadm搭建k8s集群-ubuntu/debian发行版 
> 注：以下命令都假设，当前为root用户

## 准备工作 [[文档地址](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm)]
  - [检查网络适配器](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#%E6%A3%80%E6%9F%A5%E7%BD%91%E7%BB%9C%E9%80%82%E9%85%8D%E5%99%A8)
  - [允许 iptables 检查桥接流量](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#%E6%A3%80%E6%9F%A5%E7%BD%91%E7%BB%9C%E9%80%82%E9%85%8D%E5%99%A8)
  - [检查所需端口](https://kubernetes.io/zh/docs/setup/production-environment/tools/kubeadm/install-kubeadm/#check-required-ports)

## 安装 kubernetes-cni kubeadm kubelet kubectl
- 简介
  - kubernetes-cni：常见容器网络接口模块插件
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

- 安装 kubernetes-cni
  - apt-get install kubernetes-cni
- 安装 kubelet kubeadm kubectl，并锁定其版本
  - apt-get install -y kubelet kubeadm kubectl
  - apt-mark hold kubelet kubeadm kubectl

## docker 运行时安装

### 官方教程
- [[ubuntu](https://docs.docker.com/engine/install/ubuntu/)]
- [[debian](https://docs.docker.com/engine/install/debian/)]
### 问题解决
- docker info 会显示 WARNING: No swap limit support
  - vim /etc/default/grub
    ```conf
    # 给GRUB_CMDLINE_LINUX配置添加 cgroup_enable=memory swapaccount=1 参数
    GRUB_CMDLINE_LINUX="cgroup_enable=memory swapaccount=1"
    ```
  - 保存文件更新
    - update-grub
  - 重启电脑
    - reboot

## kubeadm 创建集群
- 创建控制平面节点
  - kubeadm init [[文档地址](https://kubernetes.io/zh/docs/reference/setup-tools/kubeadm/kubeadm-init/)]
    - 前置配置
      - 关闭交换区
        ```shell
        # 关闭交换区
        swapoff -a
        # 注释掉，交换区挂载
        sed -i '/swap/s/^/#/' /etc/fstab
        ```
      - 忽略swap(不清楚为啥，总是提示不支持swap)
        ```shell
        echo 'KUBELET_EXTRA_ARGS="--fail-swap-on=false"' > /etc/default/kubelet
        ```
    - 创建的master节点，也可以当work节点使用，但主要功能是集群的控制面板
      - 初始化命令及参数
        ```shell
        kubeadm init \
        # k8s版本号，默认：stable-1
          --kubernetes-version [k8s版本号] \
        # 国内使用aliyun镜像源，避免卡在拉镜像上
          --image-repository registry.aliyuncs.com/google_containers \
        # 容器子网路由区间(cidr)，这个块其实可以随便写的，下面cni插件我们用的是kube-flannel，它的例子配置默认是10.244.0.0/16，我们就和它保持一致
          --pod-network-cidr 10.244.0.0/16
        ```
      - 初始化成功之后，
        - 保存集群配置文件
          ```shell
          # 为当前用户，创建kubectl的配置读取目录
          mkdir ~/.kube

          # 拷贝管理员配置文件
          cp /etc/kubernetes/admin.conf ~/.kube/config
          ```
        - 保存添加work节点的参数，方便后面扩展work节点
          ```shell
          kubeadm join [ip]:[port] --token [token-val] --discovery-token-ca-cert-hash [hash-val]
          ```
    - 报错排查 (只要出现任何报错，执行kubeadm reset重置上次的init)
      - docker的cgroup-driver与kubelet的不一致
        - 查看各自cgroup-driver
          ```shell
          # 查看docker的cgroup-driver
          docker info | grep "Cgroup D" | cut -d" " -f4

          # 查看kubelet的cgroup-driver
          cat /var/lib/kubelet/config.yaml | grep cgroupDriver | cut -d" " -f2
          ```
        - 解决办法：修改docker的cgroup-driver为systemd(假设kubelet的为systemd)
          ```shell
          # 添加配置项 "exec-opts": ["native.cgroupdriver=systemd"]
          vim /etc/docker/daemon.json

          # 重启docker
          systemctl restart docker

          # 查看docker的cgroup-driver
          docker info | grep "Cgroup D" | cut -d" " -f4
          ```
      - 查看kubelet日志
        ```shell
        # 很多问题，看kubelet错误日志，就可以很好捕获到并解决
        journalctl -fxeu kubelet
        ```
- 安装插件addons
  - 创建addons目录
    ```shell
    mkdir ~/.kube/addons
    ```
  - 安装cni插件 - flannel
    - 步骤
      ```shell
      cd ~/.kube/addons

      # 这个需要科学上网，才能下载
      curl -o kube-flannel.yml https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml

      # 使用下载好的文件
      kubectl apply -f kube-flannel.yml

      # 查看flannel，运行情况
      kubectl get pods -n kube-system -o wide
      ```
    - 安装失败，最好清理cni相关目录配置文件
      ```shell
      # 这个建议慎重清理吧，主要都是kubernetes-cni安装的，可以用 dpkg -L kubernetes-cni 查看都装了些什么
      # rm -rf /opt/cni/bin/*

      # 清空cni插件相关的配置文件
      rm -rf /etc/cni/net.d/*
      ```
  - 安装ui插件 - dashboard
    - 步骤
      ```shell
      cd ~/.kube/addons

      # 这个需要科学上网，才能下载
      curl -o dashboard.yml https://raw.githubusercontent.com/kubernetes/dashboard/v2.4.0/aio/deploy/recommended.yaml
      
      # 使用下载好的文件
      kubectl apply -f dashboard.yml

      # 查看dashboard，运行情况
      kubectl -n kubernetes-dashboard get pods -o wide
      ```
    - 创建管理员用户 [[文档地址](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md#creating-a-service-account)]
      - vim dashboard-adminuser.yaml
        ```yaml
        # 由于例子dashboard.yml中的ServiceAccount(kubernetes-dashboard)被赋予的权限太小，我们需要创建一个赋予集群权限的ServiceAccount(admin-user)

        apiVersion: v1
        kind: ServiceAccount
        metadata:
          name: admin-user
          namespace: kubernetes-dashboard

        ---

        apiVersion: rbac.authorization.k8s.io/v1
        kind: ClusterRoleBinding
        metadata:
          name: admin-user
        roleRef:
          apiGroup: rbac.authorization.k8s.io
          kind: ClusterRole
          name: cluster-admin
        subjects:
        - kind: ServiceAccount
          name: admin-user
          namespace: kubernetes-dashboard
        ```
      - 创建admin-user
        ```shell
        kubectl apply -f dashboard-adminuser.yaml
        ```
      - 获取adminuser用户token
        ```shell
        kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}" && echo
        ```
    - 删除用户及权限 [[文档地址](https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md#clean-up-and-next-steps)]
    - 浏览器访问dashboard，这里使用的是默认端口号6443
      - https://[ip]:6443/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
      - 将上面的token，填入对应输入栏即可
      - 注：解决浏览器访问403问题
        - 由于kubeadm init 生成的是私有证书，如需要浏览器访问，需要导出一份证书
          ```shell
          # 创建client目录
          mkdir /etc/kubernetes/client && cd /etc/kubernetes/client

          # 创建证书
          grep 'client-certificate-data' /etc/kubernetes/admin.conf | head -n 1 | awk '{print $2}' | base64 -d >> kubecfg.crt

          # 创建key
          grep 'client-key-data' /etc/kubernetes/admin.conf | head -n 1 | awk '{print $2}' | base64 -d >> kubecfg.key
          
          # 生成证书文件
          openssl pkcs12 -export -clcerts -inkey kubecfg.key -in kubecfg.crt -name "kubernetes-client" -out kubecfg.p12
          ```
        - 将生成的证书文件 kubecfg.p12 导入到浏览器中，假设使用chrome浏览器
          - 点击右上角三个点
          - 选择 设置
          - 点击 隐私设置和安全性
          - 选择 安全
          - 选择 管理证书，这时会弹出一个非浏览器界面
          - 点击 导入，按照默认步骤导入即可
    