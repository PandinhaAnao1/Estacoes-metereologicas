const dadosSchema = {
    dados_cadastrar_201: {
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

export default dadosSchema;