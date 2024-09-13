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
        200: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      data: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            id: { type: "integer" },
                            nome: { type: "string" },
                            endereco: { type: "string" },
                            latitude: { type: "string" },
                            longitude: { type: "string" },
                            ip: { type: "string" },
                            status: { type: "string" },
                            usuario_id: { type: "integer" },
                            temperature: { type: "number", format: "float" },
                            humidity: { type: "number", format: "float" },
                            rainfall: { type: "number", format: "float" },
                            wind_speed_kmh: { type: "number", format: "float" },
                            data_hora: { type: "string", format: "date-time" }
                          }
                        },
                        example: [
                          {
                            id: 1,
                            nome: "Estação Central",
                            endereco: "Rua Exemplo, 123",
                            latitude: "11.1111",
                            longitude: "22.2222",
                            ip: "192.168.1.1",
                            status: "ativo",
                            usuario_id: 1,
                            temperature: 22.5,
                            humidity: 75.0,
                            rainfall: 5.2,
                            wind_speed_kmh: 15.0,
                            data_hora: "2024-08-23T12:34:56Z"
                          }
                        ]
                      },
                    }
                  }
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
                    type: "object",
                    properties: {
                      error: { type: "boolean", example: true },
                      code: { type: "integer", example: 400 },
                      message: { type: "array", example: ["Temperatura informada não é do tipo string", "Umidade informada não é do tipo number", "Pluviosidade informada não é do tipo number", "Velocidade do vento informada não é do tipo number", "Data informada não é do tipo string/data", "Nenhum dado climático encontrado"] }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default dadosListar;
