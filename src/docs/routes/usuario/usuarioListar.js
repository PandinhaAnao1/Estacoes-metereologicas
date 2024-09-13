const usuarioListar = {

  //get
  "/usuarios": {
    get: {
      tags: ["Usuario"],
      summary: "Lista todos os usuários cadastrados",
      parameters: [
        {
          name: "email",
          in: "query",
          description: "Email do usuário",
          required: false,
          schema: {
            type: "string",
            example: ""
          }
        },
        {
          name: "nome",
          in: "query",
          description: "Nome do usuário",
          required: false,
          schema: {
            type: "string",
            example: ""
          }
        },
        {
          name: "id",
          in: "query",
          description: "ID do usuário",
          required: false,
          schema: {
            type: "string",
            example: ""
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
                          },
                          {
                            "id": 2,
                            "nome": "Ana Pereira",
                            "email": "ana@example.com"
                          },
                          {
                            "id": 3,
                            "nome": "vitorag",
                            "email": "5vitorgabrielvha3@gmail.com"
                          },
                          {
                            "id": 4,
                            "nome": "Maria Oliveira",
                            "email": "maria@example.com"
                          }
                        ]
                      },
                      error: { type: "boolean", example: false },
                      code: { type: "int", example: 200 },
                      message: { type: "string", example: "Usuários encontrado com sucesso" }
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
                      message: { type: "array", example: ["Nenhum usuário encontrado"] }
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
                      message: { type: "array", example: ["ID informado não é do tipo number", "ID informado não é um número inteiro", "ID informado não é positivo", "Nome informado não é do tipo string", "O Email tem que ser String", "Email invalido!"] }
                    }
                  },
                }
              }
            }
          }
        },
      }
    }
  },
};

export default usuarioListar;