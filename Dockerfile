FROM node:20

ENV NODE_ENV=${NODE_ENV}

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn global add typescript

RUN yarn install

COPY . /app


RUN yarn build

CMD ["yarn", "start"]
