# build stage

FROM node:14 as build
ARG ENV

USER node
RUN mkdir -p /home/node/code/frontend

WORKDIR /home/node/code
COPY --chown=node:node frontend/scripts frontend/scripts/
COPY --chown=node:node frontend/package*.json frontend/

WORKDIR /home/node/code/frontend
RUN scripts/Dockerfile/install.sh

WORKDIR /home/node/code
COPY --chown=node:node . ./

WORKDIR /home/node/code/frontend
RUN scripts/Dockerfile/build.sh 

# deploy stage

FROM nginx

COPY frontend/nginx/templates /etc/nginx/templates/

COPY --from=build /home/node/code/frontend/build /usr/share/nginx/html
