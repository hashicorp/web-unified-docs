# Use the official Node.js image as the base image
FROM node:18-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev"]
