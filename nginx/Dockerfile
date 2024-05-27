FROM nginx:stable-alpine
WORKDIR /app
COPY /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]