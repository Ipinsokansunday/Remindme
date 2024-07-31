# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Install http-server to serve the built application
RUN npm install -g http-server

# Expose the port the app runs on
EXPOSE 8080

# Command to run the application
CMD ["http-server", "public"]
