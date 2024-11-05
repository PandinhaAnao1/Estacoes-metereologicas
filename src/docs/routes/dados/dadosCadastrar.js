import commonResponses from "../../schemas/commonResponses.js";

const dadosCadastrar = {
  "/dados": {
    post: {
      tags: ["Dados"],
      summary: "Cadastra dados de uma estação",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {}
          }
        }
      },
      responses: {
        201: commonResponses[201]("#/components/schemas/dados_cadastrar_201"),
        400: commonResponses[400](null, null, "#/components/schemas/dados_cadastrar_400"),

      }
    }
  }
};

export default dadosCadastrar;
