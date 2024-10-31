FROM node:20

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# build on each startup
CMD npm run build && npm run dev
