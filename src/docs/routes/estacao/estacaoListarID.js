const estacaoListarId = {

  //getId
  "/estacoes/{id}": {
    get: {
      tags: ["Estacao"],
      summary: "Lista uma estacão pelo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID da Estação",
          required: true,
          schema: {
            type: "integer",
            example: 1
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
                            "id": 5,
                            "nome": "Estação Oeste",
                            "endereco": "Rua 5, Oeste",
                            "latitude": -46.637,
                            "longitude": -23.554,
                            "ip": "192.168.0.5",
                            "status": "ativo",
                            "usuario_id": 5
                          }
                        ]
                      },
                      error: { type: "boolean", example: false },
                      code: { type: "int", example: 200 },
                      message: { type: "string", example: "Estação encontrada com sucesso" }
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
                      message: { type: "array", example: ["ID não recebido"] }
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
                      message: { type: "array", example: ["ID invalido"] }
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

export default estacaoListarId;