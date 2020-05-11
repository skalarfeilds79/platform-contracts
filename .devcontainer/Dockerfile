FROM node:11.15.0

RUN npm install -g lerna
RUN npm install -g typescript@2.6.2

WORKDIR /app
CMD [ "scripts/docker-entrypoint.sh" ]
