FROM node:10.1.0-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
	build-essential \
	python

RUN mkdir -p /usr/bin/app
WORKDIR /usr/bin/app

COPY package*.json /usr/bin/app/
RUN npm i --no-save

COPY . /usr/bin/app/

CMD ["npm", "start"]
