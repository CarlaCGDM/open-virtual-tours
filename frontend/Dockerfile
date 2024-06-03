# build environment
FROM node:lts-alpine AS build-stage
WORKDIR '/app'
COPY package*.json /app/
RUN npm install --max-old-space-size=4096
COPY ./ /app/
RUN npm run build --max-old-space-size=4096

# prod environment
FROM nginx:1.15 AS production
COPY --from=build-stage /app/build/ /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/nginx/certs/cert.pem /etc/ssl/certs/cert.pem
COPY --from=build-stage /app/nginx/certs/key.pem /etc/ssl/private/key.pem

# dev environment
FROM node:lts-alpine AS development
WORKDIR '/app'
COPY package*.json /app/
COPY ./ /app/
RUN npm install --max-old-space-size=4096
EXPOSE 3000
CMD ["npm", "start"]
