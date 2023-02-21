FROM node:16.16-alpine3.15
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm", "run", "start"]