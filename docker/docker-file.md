<!-- 文档地址：https://docs.docker.com/engine/reference/builder/ -->
FROM node:current-slim
WORKDIR /usr/src/app
COPY package.json ./