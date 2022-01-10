FROM node:14
ARG ENV

USER node
RUN mkdir -p /home/node/code/backend

WORKDIR /home/node/code
COPY --chown=node:node backend/scripts backend/scripts/
COPY --chown=node:node backend/package*.json ./backend/

WORKDIR /home/node/code/backend
RUN scripts/Dockerfile/install.sh

WORKDIR /home/node/code
COPY --chown=node:node . ./

WORKDIR /home/node/code/backend
RUN npm run build
# RUN scripts/Dockerfile/build.sh
