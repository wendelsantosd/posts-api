FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN yarn

CMD ["yarn", "start:dev"]