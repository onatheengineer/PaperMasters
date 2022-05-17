# syntax=docker/dockerfile:1
FROM node:14.18.2
RUN mkdir -p /usr/scr/app

WORKDIR /usr/scr/app

COPY package.json /usr/scr/app
COPY package-lock.json /usr/scr/app


RUN npm install --silent

COPY . /usr/scr/app

RUN npm run build
RUN npm install -g serve
