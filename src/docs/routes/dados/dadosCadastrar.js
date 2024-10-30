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
        400: {
          description: "Erro na requisição",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "boolean", example: true },
                  code: { type: "int", example: 400 },
                  message: { type: "array", example: ["Temperatura informada não é do tipo número", "Umidade informada não é do tipo número", "Pluviosidade informada não é do tipo número", "Velocidade do vento informada não é do tipo número", "Data e hora informadas não são do tipo data e hora"] }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default dadosCadastrar;
