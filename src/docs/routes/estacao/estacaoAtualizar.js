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
        400: commonResponses["400"](null,null,'#/components/schemas/estacoes_atualizar_400')
      }
    }
  }
};

export default estacaoAtualizar;
