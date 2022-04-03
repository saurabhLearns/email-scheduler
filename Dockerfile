FROM node:14.19.0

WORKDIR /app

COPY package.json .

RUN npm install --save-exact

COPY . .

CMD ["node", "index.js"]