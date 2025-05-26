FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate && npx prisma migrate && npx prisma db seed

EXPOSE 3333

CMD ["npm", "run", "dev"]
