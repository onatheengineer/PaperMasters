# syntax=docker/dockerfile:1
FROM node:14.18.2
RUN mkdir -p /usr/scr/app
COPY . /usr/scr/app
WORKDIR /usr/scr/app
RUN npm install -g yarn
RUN yarn install --silent
RUN yarn run build
RUN yarn install -g serve
