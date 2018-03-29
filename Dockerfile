FROM node:9.10.0-alpine

RUN mkdir -p /usr/bin/app
COPY . /usr/bin/app/
WORKDIR /usr/bin/app

RUN npm i --no-save

CMD ["sh", "-c", "npm start >> log/app.log 2>&1"]
