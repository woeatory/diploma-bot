# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.10.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

USER node

COPY . .

CMD npm run migrate:latest && npx knex seed:run --knexfile database/knexfile.cjs
