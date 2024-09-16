FROM node:alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
ENTRYPOINT ["node", "serve.js"]