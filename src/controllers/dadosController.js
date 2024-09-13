import dadosService from "../services/dadosService.js";

class Dados {
    static async listar(req, res) {
        try {
            // Quando a API envia textplain;
            // const jsonBody = JSON.parse(req.body);
            const { temperature, humidity, rainfall, wind_speed_kmh, data_hora } = req.query;
            const filtro = {
                temperature: temperature,
                humidity: humidity,
                rainfall: rainfall,
                wind_speed_kmh: wind_speed_kmh,
                data_hora: data_hora,
            };


            if (humidity) {
                filtro.humidity = parseInt(humidity)
            }

            if (rainfall) {
                filtro.rainfall = parseInt(rainfall)
            }

            if (wind_speed_kmh) {
                filtro.wind_speed_kmh = parseInt(wind_speed_kmh)
            }

            if (data_hora) {
                filtro.data_hora = new Date(data_hora)
            }


            const response = await dadosService.listar(filtro)
            return res.status(200).json({
                data: response,
                error: false,
                code: 200,
                message: response.length > 1 ? "Dados climáticos encontrados com sucesso." : "Dado climático encontrado com sucesso.",
            });
        } catch (error) {
            res.status(error.code || 500).json(error);
        };
    };

    static async inserir(req, res) {
        try {
            const { temperature, humidity, rainfall, wind_speed_kmh } = req.body;
            const data = {
                temperature: temperature,
                humidity: humidity,
                rainfall: rainfall,
                wind_speed_kmh: wind_speed_kmh,
                data_hora: new Date(),
            };
            const response = await dadosService.inserir(data)
            return res.status(201).json({
                data: response,
                error: false,
                code: 201,
                message: 'Dados climáticos salvos com sucesso.',
            });
        } catch (error) {
            return res.status(error.code || 500).json(error);
        };
    };
};

export default Dados;