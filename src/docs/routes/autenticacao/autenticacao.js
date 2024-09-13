// import authSchemas from "../schemas/authSchema.js";
// import commonResponses from "../schemas/commonResponses.js";

const autenticacao = {
  "/autenticacao": {
    post: {
      tags: ["Autenticacao"],   
      summary: "Realiza login",
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
                type: "object",
                properties: {
                  data: {
                    type: "object", 
                    properties: {
                      token: { type: 'string', example: "tokenExemploAlld4D" },
                      error: { type: "boolean", example: false },
                      code: { type: "int", example: 201 },
                      message: { type: "string", example: "Token gerado com sucesso!" }
                    }
                  }
                }
              }
            }
          }
        },

        400: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object", 
                    properties: {
                      error: { type: "boolean", example: true },
                      code: { type: "int", example: 400 },
                      message: { type: "array", example: [
                        "Campo email é obrigatório!", 
                        "Email invalido!", 
                        "Email Não cadastrado!", 
                        "Campo senha é obrigatório!", 
                        "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.", 
                        "A senha deve possuir no minimo 8 caracteres!"
                      ] }
                    }
                  }
                }
              }
            }
          }
        },
      }
    }
  }
};

export default autenticacao;
