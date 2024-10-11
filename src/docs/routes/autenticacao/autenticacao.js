// import commonResponses from "../schemas/commonResponses.js";

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
        201: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/autenticao_201"

              }
            }
          }
        },
        400: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/autenticao_400"
              }
            }
          }
        },
        500: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/autenticao_500"
              }
            }
          }
        }
      }
    }
  }
};

export default autenticacao;
