import commonResponses from "../../schemas/commonResponses.js";

const estacaoAtualizar = {
  // Rota para Atualizar uma Estação pelo ID
  "/estacoes/{id}/": {
    patch: {
      tags: ["Estacao"],
      summary: "Atualiza uma Estação pelo ID",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID da estação",
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
                  example: "Estação Central"
                },
                endereco: {
                  type: "string",
                  example: "Rua 1, Centro"
                },
                latitude: {
                  type: "number",
                  format: "float",
                  example: -46.6333
                },
                longitude: {
                  type: "number",
                  format: "float",
                  example: -23.5505
                },
                ip: {
                  type: "string",
                  example: "192.168.0.1"
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
        200: commonResponses["200"]('#/components/schemas/estacoes_atualizar_200'),
        400: {
          description: "Erro na requisição",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "boolean", example: true },
                  code: { type: "int", example: 400 },
                  message: { type: "array", example: ["Campo Nome É Obrigatório!", "O Nome tem que ser String", "Campo Endereço É Obrigatório!", "O Endereço tem que ser String", "Campo Latitude É Obrigatório!", "Latitude deve ser um número", "Campo Longitude É Obrigatório!", "Longitude deve ser um número", "Campo IP É Obrigatório!", "IP deve ser um formato válido", "Campo Status É Obrigatório!", "Status deve ser String", "Campo Usuario ID É Obrigatório!", "Usuario ID deve ser um número inteiro", "Estação não encontrada", "Não foi possível atualizar estação"] }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default estacaoAtualizar;
