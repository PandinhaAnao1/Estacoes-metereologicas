import commonResponses from "../../schemas/commonResponses.js";

const dadosListar = {
  "/dados/": {
    get: {
      tags: ["Dados"],
      summary: "Lista todos os dados cadastrados",
      parameters: [
        {
          name: "pagina",
          in: "query",
          description: "pagina da listagem",
          required: false,
          schema: {
            type: "number",
            format: "int",
          }
        },
        {
          name: "quantidade",
          in: "query",
          description: "quantidade por pagina",
          required: false,
          schema: {
            type: "number",
            format: "int",
          }
        },
        {
          name: "temperature",
          in: "query",
          description: "Temperatura da estação",
          required: false,
          schema: {
            type: "number",
            format: "float",
          }
        },
        {
          name: "humidity",
          in: "query",
          description: "Umidade da estação",
          required: false,
          schema: {
            type: "int",
          }
        },
        {
          name: "rainfall",
          in: "query",
          description: "Pluviosidade da estação",
          required: false,
          schema: {
            type: "number",
            format: "float",
          }
        },
        {
          name: "wind_speed_kmh",
          in: "query",
          description: "Velocidade do vento em km/h",
          required: false,
          schema: {
            type: "number",
            format: "float",
          }
        },
        {
          name: "data_hora",
          in: "query",
          description: "Data e hora dos dados",
          required: false,
          schema: {
            type: "string",
          }
        }
      ],
      responses: {
        200: commonResponses[200]("#/components/schemas/dados_listar_200"),
        400: commonResponses[400](null, null, "#/components/schemas/dados_listar_400"),
        500: commonResponses[500](),


      }
    }
  }
};

export default dadosListar;
