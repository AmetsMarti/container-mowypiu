# Use the official Node.js 14 image.
# https://hub.docker.com/_/node
FROM node:14

# Create and change to the app directory.
WORKDIR C:\Users\Amets\TheDB\TheDB\backend

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install
RUN npm install mysql express cors

# Copy local code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "start" ]

# Inform Docker that the container listens on the specified port at runtime.
EXPOSE 3000
