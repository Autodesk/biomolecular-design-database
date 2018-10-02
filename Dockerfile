FROM node:7

ENV APP /app
RUN mkdir -p $APP
WORKDIR $APP

ADD ./package.json $APP/package.json
RUN npm install

RUN mkdir $APP/client
WORKDIR $APP/client

ADD ./client/package.json $APP/client/package.json
RUN npm install

COPY ./client $APP/client
RUN npm run build

COPY . $APP/

WORKDIR $APP

CMD npm run server
