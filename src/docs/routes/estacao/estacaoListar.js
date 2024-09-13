const estacaoListar = {
  "/estacoes/": {
    get: {
      tags: ["Estacao"],
      summary: "Lista todas as estações cadastradas",
      parameters: [
        {
          name: "id",
          in: "query",
          description: "ID da estação",
          required: false,
          schema: {
            type: "integer"
          }
        },
        {
          name: "nome",
          in: "query",
          description: "Nome da estação",
          required: false,
          schema: {
            type: "string",
            example: ""
          }
        },
        {
          name: "endereco",
          in: "query",
          description: "Endereço da estação",
          required: false,
          schema: {
            type: "string",
            example: ""
          }
        },
        {
          name: "latitude",
          in: "query",
          description: "Latitude da estação",
          required: false,
          schema: {
            type: "string",
            example: ""
          }
        },
        {
          name: "longitude",
          in: "query",
          description: "Longitude da estação",
          required: false,
          schema: {
            type: "string",
            example: ""
          }
        },
        {
          name: "ip",
          in: "query",
          description: "IP da estação",
          required: false,
          schema: {
            type: "string",
            example: ""
          }
        },
        {
          name: "status",
          in: "query",
          description: "Status da estação",
          required: false,
          schema: {
            type: "string",
            example: ""
          }
        },
        {
          name: "usuario_id",
          in: "query",
          description: "ID do usuário associado",
          required: false,
          schema: {
            type: "integer"
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
                            "nome": "Estação Central",
                            "endereco": "Rua Exemplo, 123",
                            "latitude": "11.1111",
                            "longitude": "22.2222",
                            "ip": "192.168.1.1",
                            "status": "ativo",
                            "usuario_id": 1
                          },
                          {
                            "id": 2,
                            "nome": "Estação Norte",
                            "endereco": "Avenida Exemplo, 456",
                            "latitude": "33.3333",
                            "longitude": "44.4444",
                            "ip": "192.168.1.2",
                            "status": "inativo",
                            "usuario_id": 2
                          }
                        ]
                      },
                      error: { type: "boolean", example: false },
                      code: { type: "int", example: 200 },
                      message: { type: "string", example: "Estações encontradas com sucesso" }
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
                      message: { type: "array", example: ["ID informado não é do tipo number", "ID informado não é um número inteiro", "ID informado não é positivo", "Nome informado não é do tipo string", "Endereço informado não é do tipo string", "Latitude informada não é do tipo number", "Longitude informada não é do tipo number", "IP informado não é do tipo string", "IP informado não segue o padrão (IPv4 ou IPv6)", "Status não é do tipo string", "Status informado não corresponde ao formato indicado (ativo ou inativo)", "ID do usuário informado não é do tipo number", "ID do usuário informado não é um número inteiro", "ID do usuário informado não é um inteiro positivo", "Nenhuma estação encontrada"] }
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

export default estacaoListar;
