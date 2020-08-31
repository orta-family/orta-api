# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
# FROM node:12-alpine also works here for a smaller image
FROM node:12.18.3-slim

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG OA_PORT=3333
ENV OA_PORT $OA_PORT
EXPOSE $OA_PORT

# you'll likely want the latest npm, regardless of node version, for speed and fixes
# but pin this version for the best stability
RUN npm i npm@latest -g

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir -p /opt/node_app/app/dist
RUN chown node:node /opt/node_app/app
RUN chown node:node /opt/node_app/app/dist
WORKDIR /opt/node_app/app

# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app.
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node
COPY package.json package-lock.json* ./
RUN npm ci --no-optional && npm cache clean --force
ENV PATH /opt/node_app/app/node_modules/.bin:$PATH

# check every 30s to ensure this service returns HTTP 200 - DISABLE FOR NOW
HEALTHCHECK --interval=30s CMD node healthcheck.js

# copy in our source code last, as it changes the most
COPY . .
RUN npm run build

# COPY docker-entrypoint.sh /usr/local/bin/
# ENTRYPOINT ["docker-entrypoint.sh"]


# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "dist/server" ]