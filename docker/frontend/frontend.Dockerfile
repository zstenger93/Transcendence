FROM node:14

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install && \
    npm install react-router-dom && \
    npm install tailwindcss postcss autoprefixer react-slick slick-carousel react-intl

COPY . .

EXPOSE 3000

CMD ["npm", "start"]