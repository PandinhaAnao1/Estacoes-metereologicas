import commonResponses from "../../schemas/commonResponses.js";

const usuarioListarId = {

  "/usuarios/{id} ": {
    get: {
      tags: ["Usuario"],
      summary: "Lista o usuário pelo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do usuário",
          required: true,
          schema: {
            type: "integer", 
            example: 9
          }
        }
      ],
      responses: {
        200: commonResponses['200']("#/components/schemas/usuario_listar_ID_200"),
        400: commonResponses['400'](null,"Erro ao listar o usuario por id","#/components/schemas/usuario_listar_ID_400"),
        500: commonResponses['500']()
      }
    }
  }
};

export default usuarioListarId;