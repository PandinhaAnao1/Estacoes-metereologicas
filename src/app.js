import express, { json } from "express";
import routes from "./routes/index.js";
import { prisma } from "./configs/prismaClient.js";
import cors from "cors"; // permite o fornt-end usar essa api (resumindo)

const app = express();


app.use(cors({
    origin: '*', // Permitir requisições da aplicação rodando em localhost:3000
    methods: ['GET', 'POST', 'PUT', 'PATCH','DELETE', 'OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization', "application/json"], // Cabeçalhos permitidos
    credentials: true // Permitir envio de cookies ou headers de autenticação
}));


app.use(express.json());
routes(app);

export default app;