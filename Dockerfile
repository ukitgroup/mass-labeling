FROM node:8.9-slim

RUN apt-get update && \
	apt-get install -y --no-install-recommends \
		build-essential \
		git \
		libfontconfig1 \
		openssh-client \
		python


RUN mkdir -p /usr/bin/app
COPY . /usr/bin/app/
WORKDIR /usr/bin/app

RUN npm i --no-save


CMD ["bash", "-c", "npm start >> log/app.log 2>&1"]
