### STAGE 1: Build ###
#FROM node:14.15-alpine AS build
FROM node:14
WORKDIR /app

#COPY package.json .

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build
