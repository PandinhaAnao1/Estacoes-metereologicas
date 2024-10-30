const dadosSchema = {


dados_cadastrar_201:{
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

export default dadosSchema;