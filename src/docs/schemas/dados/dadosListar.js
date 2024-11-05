const dadosSchemaListar = {

    dados_listar_200: {
        type: "array",
        example: [

            {
                id: 1,
                temperature: 22.5,
                humidity: 75.0,
                rainfall: 5.2,
                wind_speed_kmh: 15.0,
                data_hora: "2024-08-23T12:34:56Z"
            }
        ]
    },
    dados_listar_400: {
        type: "array",
        example: [
            {
                path: "id",
                message: "ID inválido"
            },
            {
                path: "temperature",
                message: "Temperatura inválida"
            },
            {
                path: "humidity",
                message: "Umidade inválida"
            },
            {
                path: "rainfall",
                message: "Precipitação inválida"
            },
            {
                path: "wind_speed_kmh",
                message: "Velocidade do vento inválida"
            },
            {
                path: "data_hora",
                message: "Data e hora inválidas"
            }
        ]
    }
};

export default dadosSchemaListar;