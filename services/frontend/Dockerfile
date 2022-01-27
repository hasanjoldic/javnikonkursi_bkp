# build stage

FROM node:16 as build
ARG ENV

USER node
RUN mkdir -p /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node services/frontend/package.json ./services/frontend/
COPY --chown=node:node packages/shared/package.json ./packages/shared/
RUN yarn install --frozen-lockfile

COPY --chown=node:node packages ./packages
RUN yarn workspace @javnikonkursi/shared build
COPY --chown=node:node services/frontend ./services/frontend
RUN services/frontend/scripts/docker/build.sh


# deploy stage

# FROM nginx:alpine

COPY services/frontend/nginx/templates /etc/nginx/templates/
COPY services/frontend/build /usr/share/nginx/html

# COPY --from=build /home/node/code/services/frontend/build /usr/share/nginx/html
COPY /home/node/code/services/frontend/build /usr/share/nginx/html

EXPOSE 8080
