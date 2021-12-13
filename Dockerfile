#EXAMPLE: docker run --name nicobeer -d -p 9965:9965 -e PORT=9965 -e MONGO_CONNECTIONSTRING=CONNECTIONSTRING -e MONGO_DATABASE=DATABASE -v /home/web/nicodotbeer:/app/data --restart unless-stopped nicodotbeer
FROM node:12.19-alpine

WORKDIR /app
COPY package*.json .

RUN npm install

COPY * .

ENV PORT 9965

EXPOSE ${PORT}
CMD ["node", "app.js"]