FROM node:20

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install -g npm@latest

COPY . .

EXPOSE 3000

CMD ["npm", "start"]