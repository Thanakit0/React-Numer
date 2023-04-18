FROM node:18-alpine


#RUN apt-get update && apt-get install -y nodejs npm

WORKDIR /app

COPY . .

RUN npm install

COPY package.json .

EXPOSE 8080

CMD [ "npm", "start" ]

