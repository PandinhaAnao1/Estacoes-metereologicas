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
        400: commonResponses["400"](null, null, "#/components/schemas/estacoes_listar_400"),
        500: commonResponses["500"]()
      }
    }
  },
};

export default estacaoListar;
