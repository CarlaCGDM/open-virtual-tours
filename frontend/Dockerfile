# frontend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci 
RUN npm install
COPY . .
RUN npm run build

