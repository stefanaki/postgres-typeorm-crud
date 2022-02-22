FROM node:17.3

WORKDIR /usr/src/api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

VOLUME [ "./node_modules" ]

CMD [ "npm", "run", "dev" ]