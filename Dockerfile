FROM node:18.17.1

WORKDIR /usr/src/app

COPY . .

RUN yarn

CMD ["yarn", "start:dev"]