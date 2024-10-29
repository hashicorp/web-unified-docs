FROM node:20

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

RUN  npm run build

EXPOSE 8080

CMD npm run watch-content & npm run dev
