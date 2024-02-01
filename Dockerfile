FROM node:18-alpine as compiler

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
ARG NPM_TOKEN

WORKDIR /usr/wallet-pass-service

COPY src ./src
COPY .npmrc package*.json tsconfig.json ./

RUN npm install
RUN npm run build


FROM node:18-alpine as vendor

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG NPM_TOKEN

WORKDIR /usr/wallet-pass-service

COPY .npmrc package*.json ./
RUN npm install


FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/wallet-pass-service

COPY --from=compiler /usr/wallet-pass-service/dist dist
COPY --from=vendor /usr/wallet-pass-service/node_modules node_modules

EXPOSE 80

COPY . .

CMD ["node", "dist/src/api.js"]
