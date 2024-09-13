// import authSchemas from "../schemas/authSchema.js";
// import commonResponses from "../schemas/commonResponses.js";

const usuarioAtualizar = {

  // Rota para Atualizar um usuário
  "/usuarios/{id}/": {
    patch: {
      tags: ["Usuario"],
      summary: "Atuáliza um usuário",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do usuário",
          required: true,
          schema: {
            type: "integer",
            example: 1
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: {
                  type: "string",
                  example: "marcos"
                },
                email: {
                  type: "string",
                  example: "marcos@gmail.com"
                },
                senha: {
                  type: "string",
                  example: "Senha123@"
                }
              },
              required: ["nome", "email", "senha"]
            }
          }
        }
      },
      responses: {
        200: {
          description: "Usuario atualizado com sucesso!!!",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    example: {
                      id: 1,
                      nome: "marcos",
                      email: "1marcos@gmail.com",
                    }
                  },
                  error: { type: "boolean", example: false },
                  code: { type: "int", example: 200 },
                  message: { type: "string", example: "Usuario atualizado com sucesso!!!" }
                }
              }
            }
          }
        },
        400: {
          description: "Erro na requisição",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "boolean", example: true },
                  code: { type: "int", example: 400 },
                  message: { type: "array", example: ["Campo Nome É Obrigatório!" , "O nome tem que ser String", "O Nome Deve Conter Pelo Menos 3 Letras!", "Campo Email É Obrigatório!", "O Email Tem Que Ser String", "Email Invalido!", "Campo Senha É Obrigatório!", "O Senha Tem Que Ser String", "A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um símbolo."] }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default usuarioAtualizar;
