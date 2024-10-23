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
        200: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/listar_ID_200"
              }
            }
          }
        },
        404: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/listar_ID_404"
              }
            }
          }
        },
        400: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/listar_ID_400"
              }
            }
          }
        },
      }
    }
  }
};

export default usuarioListarId;