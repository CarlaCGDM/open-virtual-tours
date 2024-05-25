# build environment
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/nginx/cert.pem /etc/nginx/conf.d/cert.pem
COPY --from=build /app/nginx/key.pem /etc/nginx/conf.d/key.pem
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

