import dadosRepository from "../repositories/dadosRepository.js"
import { z } from "zod";
import DadosSchemas from "../schemas/dadosSchemas.js";
import { APIErro } from "../util/apiErrro.js";
import PaginationSchema from "../schemas/paginationSchema.js";

class dadosService {
    static async listar(filtro) {
        const dados = DadosSchemas.listar.parse(filtro);
        const { pagina, quantidade } = PaginationSchema.paginationSchema.parse(filtro);
        const response = await dadosRepository.findMany(dados)
        if (response.length === 0) {
            throw new APIErro(400, [{
                path: "message",
                message: "Nenhum dado climático encontrado",
            }]);
        }
        return response;

    };
    static async inserir(data) {
        const { temperature, humidity, rainfall, wind_speed_kmh, data_hora } = DadosSchemas.cadastrar.parse(data);
        const response = await dadosRepository.create({
            temperature: temperature,
            humidity: humidity,
            rainfall: rainfall,
            wind_speed_kmh: wind_speed_kmh,
            data_hora: data_hora
        });
        if (!response)
            throw new APIErro(
                400,
                [
                    {
                        message: "Não foi possível inserir os dados climáticos no banco de dados.",
                        path: 'message',
                    }
                ],
            );

        return response;
    }
}

export default dadosService