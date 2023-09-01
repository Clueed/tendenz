# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.4.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js/Prisma"

# Node.js/Prisma app lives here
WORKDIR /app

# Throw-away build stage to reduce size of final image
FROM base as prune

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope="@tendenz/server" --docker


FROM base AS build
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential openssl 
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/yarn.lock ./yarn.lock
RUN yarn install

COPY --from=prune /app/out/full/ .
RUN yarn global add turbo
RUN turbo run db:generate --filter="@tendenz/server"
RUN turbo run build --filter="@tendenz/server"


# Final stage for app image
FROM base AS run

WORKDIR /app

ENV NODE_ENV=production

# Install packages needed for deployment
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists /var/cache/apt/archives

# Copy built application
COPY --from=build /app/server/dist .

# Entrypoint prepares the database.
ENTRYPOINT [ "/app/docker-entrypoint.js" ]

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "node", "./dist/index.js" ]
