FROM node:18

ENV DOCKERIZE_VERSION v0.9.2

RUN apt-get update \
    && apt-get install -y --no-install-recommends wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY . .

RUN npm install mysql --save

EXPOSE 3000

# CMD [ "node", "index.js"]