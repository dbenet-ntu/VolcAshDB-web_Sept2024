# Use an official Node.js runtime as the base image for building the backend
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend source code to the container
COPY . .

# Expose the port your backend app will run on
EXPOSE 5001

# Start the backend app
CMD ["npm", "start"]
