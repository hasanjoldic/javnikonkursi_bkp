FROM node:14
ARG ENV

USER node
RUN mkdir -p /home/node/code

WORKDIR /home/node/code
COPY --chown=node:node . ./
# COPY --chown=node:node package.json yarn.lock ./
# COPY --chown=node:node services/backend/package.json services/backend/tsconfig.json services/backend/
# COPY --chown=node:node services/backend/scripts services/backend/scripts/

# WORKDIR /home/node/code
# RUN ./services/backend/scripts/Dockerfile/install.sh
# RUN yarn install

# WORKDIR /home/node/code
# COPY --chown=node:node . ./

# WORKDIR /home/node/code/services/backend
# # RUN yarn build
# RUN scripts/Dockerfile/build.sh
