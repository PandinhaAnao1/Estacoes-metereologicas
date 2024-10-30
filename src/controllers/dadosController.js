import DadosService from "../services/dadosService.js";
import { APIErro } from "../util/apiErrro.js";
import { z } from "zod";
import { sendError, sendResponse } from "../util/messages.js";
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


            const response = await DadosService.listar(filtro)
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
            const response = await DadosService.inserir(req.body);
            return sendResponse(res, 201, {
                data: response,
                code: 201,
            });
        } catch (error) {

            if (error instanceof APIErro) {
                const { code, errors } = error.toJson();
                return sendError(res, code, ...errors);
            }

            if (error instanceof z.ZodError) {
                let errors = [];
                error.issues.map((issue) => (
                    errors.push({
                        path: issue.path[0],
                        message: issue.message
                    })));

                return sendError(res, 400, errors);
            }

            return sendError(res, 500, []);

        };
    };
};

export default Dados;