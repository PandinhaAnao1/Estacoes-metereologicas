// import authSchemas from "../schemas/authSchema.js";
// import commonResponses from "../schemas/commonResponses.js";

const usuarioCadastrar = {

  // Rota para cadastrar um usuário
  "/usuarios ": {
    post: {
      tags: ["Usuario"],
      summary: "Cadastra um usuário",
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
        201: {
          description: "Usuário cadastrado com sucesso!",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/usuario_cadastrar_201'
              }
            }
          }
        },
        400: {
          description: "Erro na requisição",
          content: {
            "application/json": {
              schema: {
                $ref: '#/components/schemas/usuario_cadastrar_400'
              }
            }
          }
        }
      }
    }
  }
};

export default usuarioCadastrar;
