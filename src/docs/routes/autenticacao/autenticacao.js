import commonResponses from "../../schemas/commonResponses.js";

const autenticacao = {
  "/autenticacao": {
    post: {
      tags: ["Autenticacao"],
      summary: "Rota para realizar o login na API.",
      requestBody: {
        content: {
          "application/json": {
            schema: {

              type: "object",
              required: ["email", "senha"], // Required definido corretamente
              properties: {
                email: { type: "string", example: "fernanda@example.com" },
                senha: { type: "string", example: "Senha123@" }
              }
            }
          }
        }
      },
      responses: {
        201: commonResponses["201"]("#/components/schemas/autenticao_201"),
        400: commonResponses["400"](null,"Erro ao autenticar","#/components/schemas/autenticao_400"),
        500: commonResponses["500"](),
      }
    }
  }
};

export default autenticacao;
