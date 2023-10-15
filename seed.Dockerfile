from node:18-alpine

WORKDIR /app

COPY seed.mjs .

RUN yarn add mongodb

CMD ['node', 'seed.mjs']