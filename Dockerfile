# syntax=docker.io/docker/dockerfile:1
FROM node:22.19.0-bookworm-slim AS dev

USER node
WORKDIR /app

ARG NODE_HOME="/home/node"
ENV COREPACK_HOME="$NODE_HOME/.corepack"
ENV PNPM_HOME="$NODE_HOME/.pnpm"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV COREPACK_INTEGRITY_KEYS=0
ENV PATH="$COREPACK_HOME:$PATH"

# Copy package.json and lock files
COPY --chown=1000:1000 package*.json .npmrc pnpm-*.yaml ./
RUN mkdir -p "$COREPACK_HOME" \
    && corepack enable --install-directory "$COREPACK_HOME" \
    && corepack install

# Copy package.json files from apps
COPY --chown=1000:1000 ./package.json ./

RUN --mount=type=cache,id=pnpm,target="$NODE_HOME/.pnpm/store/",uid=1000,gid=1000 corepack pnpm install --frozen-lockfile --prefer-offline

COPY --chown=1000:1000 . .

ENV HOSTNAME=0.0.0.0
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000

CMD ["corepack", "pnpm", "run", "dev"]
