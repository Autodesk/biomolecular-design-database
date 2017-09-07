FROM node:7

ENV APP /app
RUN mkdir -p $APP
WORKDIR $APP

ADD ./package.json $APP/package.json
RUN npm install -g create-react-app
RUN npm install


COPY . $APP/


CMD npm start