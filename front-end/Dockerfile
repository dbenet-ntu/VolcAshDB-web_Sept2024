# Use an official Node.js runtime as the base image for building the frontend
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the rest of the frontend source code to the container
COPY . .

# Build the frontend app
RUN npm run build

# Serve the built React app using a lightweight HTTP server
FROM nginx:alpine

# Copy the built React app to the Nginx web server directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
