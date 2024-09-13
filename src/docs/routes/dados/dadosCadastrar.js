const dadosCadastrar = {
  "/dados": {
    post: {
      tags: ["Dados"],
      summary: "Cadastra dados de uma estação",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                temperature: {
                  type: "number",
                  format: "float",
                  example: 22.5
                },
                humidity: {
                  type: "number",
                  format: "float",
                  example: 75.0
                },
                rainfall: {
                  type: "number",
                  format: "float",
                  example: 5.2
                },
                wind_speed_kmh: {
                  type: "number",
                  format: "float",
                  example: 15.0
                },
                data_hora: {
                  type: "string",
                  format: "date-time",
                  example: "2024-08-23T12:34:56Z"
                }
              },
              required: ["temperature", "humidity", "rainfall", "wind_speed_kmh", "data_hora"]
            }
          }
        }
      },
      responses: {
        201: {
          description: "Dados cadastrados com sucesso!",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    example: {
                      id: 1,
                      temperature: 22.5,
                      humidity: 75.0,
                      rainfall: 5.2,
                      wind_speed_kmh: 15.0,
                      data_hora: "2024-08-23T12:34:56Z"
                    }
                  },
                  error: { type: "boolean", example: false },
                  code: { type: "int", example: 201 },
                  message: { type: "string", example: "Dados salvos com sucesso!" }
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
                  message: { type: "array", example: ["Temperatura informada não é do tipo número", "Umidade informada não é do tipo número", "Pluviosidade informada não é do tipo número", "Velocidade do vento informada não é do tipo número", "Data e hora informadas não são do tipo data e hora"] }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default dadosCadastrar;
