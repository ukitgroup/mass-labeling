FROM node:9.10.0-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
	build-essential \
	python

RUN mkdir -p /usr/bin/app
WORKDIR /usr/bin/app
COPY . /usr/bin/app/

RUN npm i --no-save

CMD ["sh", "-c", "npm start"]
