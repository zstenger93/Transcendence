FROM node:14-alpine
WORKDIR /app/frontend
COPY package*.json ./
RUN npm install && npm install react-router-dom && install tailwindcss postcss autoprefixer 
COPY . .
EXPOSE 3000
CMD ["npm", "start"]