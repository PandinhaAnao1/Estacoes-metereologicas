const usuarioListarId = {

  //getId
  "/usuarios/{id}": {
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
                type: "object",
                properties: {
                  data: {
                    type: "object", items: {}, example:
                    {
                      data: {
                        type: 'array', example: [
                          {
                            "id": 1,
                            "nome": "usuario Atualizado",
                            "email": "vitorgabriel123@gmail.com"
                          }
                        ]
                      },
                      error: { type: "boolean", example: false },
                      code: { type: "int", example: 200 },
                      message: { type: "string", example: "Usuário encontrado com sucesso" }
                    }
                  },
                }
              }
            }
          }
        },
        404: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object", items: {}, example:
                    {
                      error: { type: "boolean", example: true },
                      code: { type: "int", example: 404 },
                      message: { type: "array", example: ["ID invalido"] }
                    }
                  },
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
                      message: { type: "array", example: ["Usuário não encontrado"] }
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

export default usuarioListarId;