FROM node:18-alpine
WORKDIR '/app'
COPY package.json .
RUN cd src/
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "index.js"]
