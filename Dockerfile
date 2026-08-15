FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install --omit=dev

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY generated ./generated
COPY src ./src

EXPOSE 3000

CMD ["npm", "start"]