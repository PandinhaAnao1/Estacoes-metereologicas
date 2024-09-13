FROM node
WORKDIR /app
COPY .  /app
RUN npm install
RUN npx prisma db pull
RUN npx prisma generate
ENV DATABASE_URL="mysql://estacao_meteorologica:admin@cloud.fslab.dev:8806/estacao_meteorologica"
ENTRYPOINT npm run dev
