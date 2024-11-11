import DadosRepository from "../repositories/dadosRepository.js"
import { z } from "zod";
import DadosSchemas from "../schemas/dadosSchemas.js";
import { APIErro } from "../util/apiErrro.js";
import PaginationSchema from "../schemas/paginationSchema.js";
import Paginacao from "../util/pagination.js";  

class dadosService {
    static async listar(filtro) {
        const dados = DadosSchemas.listar.parse(filtro);
        const { pagina = 1, quantidade = 10 } = PaginationSchema.schema.parse(filtro);
        const total = await DadosRepository.countItens(dados);
        if (total === 0) {
            throw new APIErro(400, [{
                path: "message",
                message: "Nenhum dado climático encontrado",
            }]);
        }
        const filters = Paginacao.paginationFilter( pagina, quantidade);
        const response = await DadosRepository.findMany(dados,filters);
        const paginacao = Paginacao.pagination( pagina, quantidade, total );
        console.log(paginacao);
        
        return {
            data:response,
            ...paginacao
        };

    };
    static async inserir(data) {
        const { temperature, humidity, rainfall, wind_speed_kmh, data_hora } = DadosSchemas.cadastrar.parse(data);
        const response = await DadosRepository.create({
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