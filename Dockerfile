# Copyright IBM Corp. 2024, 2026
# SPDX-License-Identifier: BUSL-1.1

FROM node:24

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD npm run dev
