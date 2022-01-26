# 설명: 알파인os를 사용하는 노드 16.13 버전이 깔려 있는 이미지를 베이스로 해서
# 개인 repo 프로젝트를 pull 받아서 프로젝트 셋팅하고 특정 프로젝트(node-secrets)를 실행함.

FROM node:16.13-alpine3.15@sha256:f21f35732964a96306a84a8c4b5a829f6d3a0c5163237ff4b6b8b34f8d70064b

# Create app directory
WORKDIR /usr/src/app

# git clone --depth=10 안하면 최신 git 내용이 반영이 안되는거 같아 추가 후 잘됨.
RUN apk update && \
    apk add --no-cache git && \
    git clone --depth=10 https://github.com/wheejinv/web1.git /usr/src/app

WORKDIR /usr/src/app/public/node/secrets

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# 3000번 포트 사용
EXPOSE 3000
ENTRYPOINT git pull && npm run start
