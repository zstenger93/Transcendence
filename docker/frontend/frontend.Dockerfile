FROM node:20

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install -g npm@latest

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start", "--only=prod"]