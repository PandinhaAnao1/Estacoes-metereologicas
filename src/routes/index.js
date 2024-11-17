import express from "express";
import estacoes from "./estacaoRouter.js";
import autenticacao from "./autenticacaoRouter.js";
import usuarios from "./usuarioRouter.js";
import dados from "./dadosRouter.js";

//imports swagger
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import getSwaggerOptions from "../docs/config/head.js";



const routes = (app) => {
    // Configurando a documentação da Swagger UI para ser servida diretamente em '/'
    const swaggerDocs = swaggerJsDoc(getSwaggerOptions());
    app.use(swaggerUI.serve);
    app.get("/", (req, res, next) => {
        swaggerUI.setup(swaggerDocs)(req, res, next);
    });

    app.use(
        express.json(),
        express.text(),
        estacoes,
        autenticacao,
        usuarios,
        dados
    );


};

export default routes;