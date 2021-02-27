FROM node:14.15.5
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json", "public", "src", "./"]

RUN npm install --production

COPY . .

CMD [ "npm", "start" ]