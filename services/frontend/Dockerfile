# build stage

FROM node:16 as build
ARG ENV

USER node
RUN mkdir -p /home/node/code

WORKDIR /home/node/code
COPY --chown=node:node . ./
RUN rm -rf services/backend
RUN scripts/docker/install.sh

RUN yarn workspace @javnikonkursi/shared run build
RUN services/frontend/scripts/docker/build.sh

# deploy stage

FROM nginx:alpine

COPY services/frontend/nginx/templates /etc/nginx/templates/

COPY --from=build /home/node/code/services/frontend/build /usr/share/nginx/html

EXPOSE 8080
