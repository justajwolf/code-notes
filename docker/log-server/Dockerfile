# 设置父镜像源
FROM node:current-slim

# 设置容器时区
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# 设置工作目录
WORKDIR /usr/src/app
# 添加项目到工作目录
ADD . /usr/src/app
# 安装依赖
RUN npm install --registry=https://registry.npm.taobao.org
# 编译构建
RUN npm run build
# 开放端口
EXPOSE 3000
# 容器启动命令
CMD npm run start
