const usuarioDeletar = {

  //Delete
  "/usuarios/{idUser}": {
    delete: {
      tags: ["Usuario"],
      summary: "Detela um usuário pelo id",
      parameters: [
        {
          name: "idUser",
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
        204: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: {
                    type: "boolean",
                    example: false
                  },
                  code: {
                    type: "integer",
                    example: 204
                  },
                  message: {
                    type: "string",
                    example: "Usuario deletado com sucesso."
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
                    type: "object", items: {}, example:
                    {
                      error: { type: "boolean", example: true },
                      code: { type: "int", example: 400 },
                      message: { type: "array", example: ["Não existe usuário com este id: 9"] }
                    }
                  },
                }
              }
            }
          }
        },
      }
    }
  }
};

export default usuarioDeletar;