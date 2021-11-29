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

- 安装 kubernetes-cni
  - apt-get install kubernetes-cni
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
      - 查看kubelet日志
        - journalctl -fxeu kubelet
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
      kubectl get pods --all-namespaces -o wide
      ```
    - 安装失败，最好清理cni相关目录
      ```shell
      # 这个慎重清理把，主要是kubernetes-cni安装的，可以用 dpkg -L kubernetes-cni 查看都装了些什么
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

      # 查看flannel，运行情况
      kubectl get pods --all-namespaces -o wide
      ```
    - 浏览器访问dashboard，这里使用的是默认端口号6443
      - https://[ip]:6443/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
      - 解决浏览器访问，403问题，由于kubeadm init 生成的是私有证书，如需要浏览器访问，需要导出一份证书
        ```shell
        # 创建证书
        grep 'client-certificate-data' /etc/kubernetes/admin.conf | head -n 1 | awk '{print $2}' | base64 -d >> kubecfg.crt

        # 创建key
        grep 'client-key-data' /etc/kubernetes/admin.conf | head -n 1 | awk '{print $2}' | base64 -d >> kubecfg.key
        
        # 生成证书文件
        openssl pkcs12 -export -clcerts -inkey kubecfg.key -in kubecfg.crt -name "kubernetes-client" -out kubecfg.p12
        ```
      - 将生成的证书文件 kubecfg.p12 导入到浏览器中，此处只举例chrome
        - 点击右上角三个点
        - 选择 设置
        - 点击 隐私设置和安全性
        - 选择 安全
        - 选择 管理证书，这时会弹出一个非浏览器界面
        - 点击 导入，按照默认步骤导入即可