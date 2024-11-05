import commonResponses from "../../schemas/commonResponses.js";

const dadosListar = {
  "/dados/": {
    get: {
      tags: ["Dados"],
      summary: "Lista todos os dados cadastrados",
      parameters: [
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
            example: 60
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
        400: commonResponses[201]("#/components/schemas/dados_cadastrar_201"),
        500: commonResponses[500](),


      }
    }
  }
};

export default dadosListar;
