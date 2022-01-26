FROM node:16.13-alpine3.15@sha256:f21f35732964a96306a84a8c4b5a829f6d3a0c5163237ff4b6b8b34f8d70064b

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./

RUN apk update && \
    apk add --no-cache git && \
    git clone https://github.com/wheejinv/web1.git /usr/src/app

WORKDIR /usr/src/app/public/node/secret

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
#COPY . .

EXPOSE 3000
#CMD [ "nodemon", "app.js" ]
ENTRYPOINT npm run start
