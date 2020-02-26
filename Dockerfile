FROM node:alpine

# Setup server
WORKDIR /app/webserver

COPY ./webserver /app/webserver

ENV NODE_ENV production

RUN npm ci

EXPOSE 8080/tcp

# Copy client
WORKDIR /app/vue

COPY ./vue/dist /app/vue/dist

WORKDIR /app

ENTRYPOINT [ "node", "/app/webserver/index.js" ]