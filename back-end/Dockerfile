FROM node:14.5.0-alpine3.12

WORKDIR /app 

COPY package.json package.lock*.json ./

RUN npm install && npm cache clean --force

COPY . .

CMD ["npm", "run", "watch:debug"]