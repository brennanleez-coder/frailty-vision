# Use the official Node.js 18 image as a base
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Vite React application
RUN yarn build

# Use a lightweight web server to serve the built app
FROM nginx:stable-alpine AS production

# Copy the build output to the Nginx public directory
COPY --from=base /src/app/dist /usr/share/nginx/html

# Optionally include source code for debugging
COPY --from=base /src/app /src/app

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
