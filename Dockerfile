FROM node:7

ENV APP /app
RUN mkdir -p $APP
WORKDIR $APP

ADD ./package.json $APP/package.json
RUN npm install

COPY . $APP/

WORKDIR $APP/client
RUN npm install
RUN npm run build

WORKDIR $APP

CMD npm run server
