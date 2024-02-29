FROM node:20

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install -g npm@latest

RUN npm install -g serve

RUN npm install

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]