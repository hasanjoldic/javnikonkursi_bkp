FROM node:16 AS build
ARG ENV

USER node
RUN mkdir -p /home/node/code

WORKDIR /home/node/code
COPY --chown=node:node . ./
RUN rm -rf services/frontend
RUN yarn install --frozen-lockfile
RUN yarn workspace @javnikonkursi/backend build

FROM node:16-alpine

USER node
RUN mkdir -p /home/node/code

WORKDIR /home/node/code

WORKDIR /home/node/code
COPY --chown=node:node . ./
RUN rm -rf services/frontend

RUN yarn install --production

COPY --from=build /home/node/code/services/backend/dist ./services/backend/dist/

EXPOSE 3000

WORKDIR /home/node/code/services/backend
CMD [ "yarn", "start"]
