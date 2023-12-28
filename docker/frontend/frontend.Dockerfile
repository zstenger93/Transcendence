FROM node:14

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install && \
    npm install react-router-dom --save && \
    npm install tailwindcss postcss autoprefixer --save && \
    npm install react-slick slick-carousel --save && \
    npm install react-i18next i18next --save && \
    npm install three --save

COPY . .

EXPOSE 3000

CMD ["npm", "start"]