FROM {{DOCKER_IMAGE_DEV}}

RUN npm install -g lerna
RUN npm install -g typescript@2.6.2

COPY . .
RUN lerna bootstrap
