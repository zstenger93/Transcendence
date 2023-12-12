# Use an official Node.js runtime as a base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install app dependencies
RUN npm install

# Copy the application files to the container
COPY frontend/ .

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["node", "App.js"]
