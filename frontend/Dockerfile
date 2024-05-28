# build environment
FROM node:lts-alpine as build-stage
WORKDIR '/app'
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# server environment
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/nginx/certs/cert.pem /etc/ssl/certs/cert.pem
COPY --from=build-stage /app/nginx/certs/key.pem /etc/ssl/private/key.pem

