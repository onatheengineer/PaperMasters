# syntax=docker/dockerfile:1
FROM node:14.18.2
RUN mkdir -p /usr/src/app
COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app
WORKDIR /usr/src/app
RUN yarn install --silent
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN yarn run build
RUN yarn global add serve