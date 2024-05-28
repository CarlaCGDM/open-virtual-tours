# build environment
FROM node:lts-alpine as build
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage environment
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

