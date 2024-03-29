FROM node:lts-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
RUN npm install
RUN npm run build
COPY . /usr/src/app

CMD ["npm", "run", "start"]