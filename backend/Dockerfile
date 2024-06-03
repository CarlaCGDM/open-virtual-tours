# Prod environment
FROM node:18-alpine
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "src/index.js"]

# Dev environment
FROM node:18-alpine AS development
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]