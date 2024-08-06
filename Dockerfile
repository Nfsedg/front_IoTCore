# Use a base image that includes Node.js
FROM node:alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# RUN node -v
# RUN npm -v

# Copy the rest of the application code
COPY . .

# Expose the port your application runs on (change if needed)
# React APP
EXPOSE 80

# Start the application
CMD ["npm", "run", "dev"]