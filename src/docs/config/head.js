import autenticacao from "../routes/autenticacao/autenticacao.js";
import usuarioListar from "../routes/usuario/usuarioListar.js";
import usuarioListarId from "../routes/usuario/usuarioListarID.js";
import usuarioCadastrar from "../routes/usuario/usuarioCadastrar.js";
import usuarioAtualizar from "../routes/usuario/usuarioAtualizar.js";
import usuarioDeletar from "../routes/usuario/usuarioDeletar.js";
import estacaoListar from "../routes/estacao/estacaoListar.js";
import estacaoListarId from "../routes/estacao/estacaoListarID.js";
import estacaoAtualizar from "../routes/estacao/estacaoAtualizar.js";
import estacoeCadastrar from "../routes/estacao/estacaoCadastrar.js";
import dadosCadastrar from "../routes/dados/dadosCadastrar.js";
import dadosListar from "../routes/dados/dadosListar.js";


// Função para definir as URLs do servidor dependendo do ambiente
const getServersInCorrectOrder = () => {
  const devUrl = { url: process.env.SWAGGER_DEV_URL || "http://localhost:7001" };
  const prodUrl = { url: process.env.SWAGGER_PROD_URL || "http://localhost:7001" };

  if (process.env.NODE_ENV === "production") return [prodUrl, devUrl];
  else return [devUrl, prodUrl];
};

// Função para obter as opções do Swagger
const getSwaggerOptions = () => {
  return {
    swaggerDefinition: {
      openapi: "3.0.0",
      info: {
        title: "API Estação Meteriológica",
        version: "1.0-alpha",
        description: "API Estação Meteorológica\n\nÉ necessário autenticar com token JWT antes de utilizar a maioria das rotas, faça isso na rota /login com um email e senha válido.",
        contact: {
          name: "Roberto",
          email: "Roberto@example.com",
        },
      },
      servers: getServersInCorrectOrder(),
      tags: [
        {
          name: "Autenticacao",
          description: "Rota para autenticação"
        },
        {
          name: "Usuario",
          description: "Rotas para gestão de usuários"
        },
        {
          name: "Estacao",
          description: "Rotas para gestão de estação"
        },
        {
          name: "Dados",
          description: "Rotas para gestão de dados"
        },
      ],
      paths: {
        //auteticaocao
        ...autenticacao,

        //usuario
        ...usuarioListar,
        ...usuarioListarId,
        ...usuarioCadastrar,
        ...usuarioAtualizar,
        ...usuarioDeletar,

        //estacao
        ...estacaoListar,
        ...estacaoListarId,
        ...estacoeCadastrar,
        ...estacaoAtualizar,

        //dados
        ...dadosListar,
        ...dadosCadastrar,
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT"
          }
        },
        schemas: {
          // ...authSchemas,
          // ...usersSchemas
        }
      },
      security: [{
        bearerAuth: []
      }]
    },
    apis: ["./src/routes/*.js"]
  };
};

export default getSwaggerOptions;
