import commonResponses from "../../schemas/commonResponses.js";

const estacaoListar = {
  "/estacoes/": {
    get: {
      tags: ["Estacao"],
      summary: "Lista todas as estações cadastradas",
      parameters: [
        {
          name: "quantidade",
          in: "query",
          description: "Quantidade de estações a serem listadas",
          required: false,
          schema: {
            type: "integer"
          }
        },
        {
          name: "pagina",
          in: "query",
          description: "Pagina que vai ser listada",
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
        200: commonResponses["200"]("#/components/schemas/estacoes_listar_200"),
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
