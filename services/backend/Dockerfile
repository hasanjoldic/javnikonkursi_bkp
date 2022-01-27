FROM node:16 AS build
ARG ENV

USER node
RUN mkdir -p /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package.json .
COPY --chown=node:node yarn.lock .
COPY --chown=node:node services/backend/package.json ./services/backend/
COPY --chown=node:node packages/shared/package.json ./packages/shared/
RUN yarn install --frozen-lockfile

COPY --chown=node:node packages ./packages
RUN yarn workspace @javnikonkursi/shared build
COPY --chown=node:node services/backend ./services/backend
RUN yarn workspace @javnikonkursi/backend build

FROM node:16-alpine AS deploy

USER node
RUN mkdir -p /home/node/code

WORKDIR /home/node/code

WORKDIR /home/node/code
COPY --chown=node:node . .
RUN rm -rf services/frontend
RUN yarn install --frozen-lockfile --production

COPY --from=build /home/node/code/services/backend/dist ./services/backend/dist/

EXPOSE 3000

WORKDIR /home/node/code/services/backend
CMD [ "yarn", "start"]
