FROM node:18.16
WORKDIR /app
COPY package*.json ./
COPY models ./models/
COPY controllers ./controllers/
COPY routers/ ./routers/
COPY .env ./
RUN npm install
ADD server.ts ./
EXPOSE 5050
CMD [ "npm", "start" ]