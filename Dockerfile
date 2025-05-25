FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

EXPOSE 3333

COPY . .
RUN npx prisma generate
