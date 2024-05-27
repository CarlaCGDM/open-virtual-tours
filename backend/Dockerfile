FROM node:18-alpine
WORKDIR '/app'
RUN cd src/
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
