FROM node
WORKDIR /app
COPY . /app
RUN npm install
RUN npx prisma generate
ENV DATABASE_URL="mysql://root:admin@db:3306/estacao_meteorologica"
ENTRYPOINT ["npm", "run", "dev"]