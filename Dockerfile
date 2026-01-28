# Copyright IBM Corp. 2024, 2025
# SPDX-License-Identifier: BUSL-1.1

FROM node:22

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# build on each startup
CMD npm run build && npm run dev
