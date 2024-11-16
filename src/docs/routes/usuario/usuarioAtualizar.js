// import authSchemas from "../schemas/authSchema.js";
import commonResponses from "../../schemas/commonResponses.js";

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
        200: commonResponses["200"]('#/components/schemas/usuario_atualizar_200'),
        400: commonResponses["400"](null, null, '#/components/schemas/usuario_atualizar_400'),
        500: commonResponses["500"]()
      }
    }
  }
};

export default usuarioAtualizar;
