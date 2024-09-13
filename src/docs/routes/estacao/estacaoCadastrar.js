const estacoeCadastrar = {
  "/estacoes": {
    post: {
      tags: ["Estacao"],
      summary: "Cadastra uma estação",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                nome: {
                  type: "string",
                  example: "vindcator"
                },
                endereco: {
                  type: "string",
                  example: "rua teste api 2024"
                },
                latitude: {
                  type: "string",
                  example: "11"
                },
                longitude: {
                  type: "string",
                  example: "11"
                },
                ip: {
                  type: "string",
                  example: "192.158.1.38"
                },
                status: {
                  type: "string",
                  example: "ativo"
                },
                usuario_id: {
                  type: "integer",
                  example: 1
                }
              },
              required: ["nome", "endereco", "latitude", "longitude", "ip", "status", "usuario_id"]
            }
          }
        }
      },
      responses: {
        201: {
          description: "Estação cadastrada com sucesso!",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    example: {
                      id: 1,
                      nome: "vindcator",
                      endereco: "rua teste api 2024",
                      latitude: "11",
                      longitude: "11",
                      ip: "192.158.1.38",
                      status: "ativo",
                      usuario_id: 1
                    }
                  },
                  error: { type: "boolean", example: false },
                  code: { type: "int", example: 201 },
                  message: { type: "string", example: "Estação cadastrada com sucesso!" }
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
                  message: { type: "array", example: ["Nome informado não é do tipo string", "Nome é obrigatório", "Email informado não é do tipo string", "Email é obrigatório", "Latitude informada não é do tipo number", "Latitude é obrigatória", "Longitude informada não é do tipo number", "Longitude é obrigatória", "IP informado não é do tipo string", "IP é obrigatório", "Formato de IP inválido", "Status não é do tipo string", "Status é obrigatório", "Status informado não corresponde ao formato indicado (ativo ou inativo)", "Estação sem vínculo com usuário", "ID não é do tipo number", "ID não é um tipo inteiro", "ID não é um inteiro positivo", "Usuário não encontrado", "Erro ao cadastrar estação"] }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default estacoeCadastrar;
