FROM node:14

WORKDIR /app/frontend

COPY package*.json ./

RUN npm install && \
    npm install react-router-dom --save && \
    npm install tailwindcss postcss autoprefixer --save && \
    npm install react-slick slick-carousel --save && \
    npm install react-i18next i18next --save && \
	npm install --save-dev @babel/plugin-proposal-private-property-in-object && \
	npm install matchmedia-polyfill

COPY . .

EXPOSE 3000

CMD ["npm", "start"]