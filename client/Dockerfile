# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies (npm install)
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose the port for the React app
EXPOSE 3000

# Start the app using npm start
CMD ["npm", "start"]
