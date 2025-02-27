import EstacaoRepository from "../repositories/estacaoRepository.js";
import EstacoesSchemas from "../schemas/estacoesSchemas.js";
import { z } from "zod";
import { APIErro } from "../util/apiErrro.js";
import PaginationSchema from "../schemas/paginationSchema.js";
import Paginacao from "../util/pagination.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";
class EstacaoService {
    static async listar(filtro) {
        const filtros = EstacoesSchemas.listar.parse(filtro);
        const { pagina = 1, quantidade = 10 } = PaginationSchema.schema.parse(filtro);
        const total = await EstacaoRepository.countItens(filtros);

        if (total === 0) {
            throw new APIErro(
                400,
                [{
                    message: "Nenhuma estação encontrada, verifique os parâmetros!",
                    path: "parâmetros"
                }]
            );
        };

        const paginado = Paginacao.paginationFilter(pagina, quantidade);

        const response = await EstacaoRepository.findMany(filtros, paginado);
        const paginacao = Paginacao.pagination(pagina, quantidade, total);

        return {
            data: response,
            ...paginacao
        };

    };

    static async listarPorID(filtro) {

        const { id } = EstacoesSchemas.id.parse(filtro);
        const response = await EstacaoRepository.findById(id);
        if (!response) {
            throw new APIErro(
                400,
                [{
                    message: "Estação não encontrada.",
                    path: "id"

                }]);
        };
        return response;
    };

    static async inserir(data) {
        const estacao = EstacoesSchemas.cadastrar.parse(data);
        const usuario = await UsuarioRepository.findById(estacao.usuario_id);
        if (!usuario || usuario.length === 0){

            throw new APIErro(400, [
                {
                    message: "Usuário não encontrado.",
                    path: "id"
                },
            ]);
        }
        const resposta = await EstacaoRepository.create(estacao);

        return resposta;
    };

    static async atualizar(_id, data) {
        const { id } = EstacoesSchemas.id.parse(_id);
        const total = await EstacaoRepository.countItens({id:id});
        if (total === 0) {
            throw new APIErro(400,
                [
                    {
                        message: "Estação não encontrado.",
                        path: "id"
                    }
                ]
            );

        }
        const {usuario_id, ...estacao} = EstacoesSchemas.atualizar.parse(data);
        
        const usuario = await UsuarioRepository.countItens({id:usuario_id});
        if (usuario === 0) {
            throw new APIErro(
                400,
                [{
                    message: "Usuário associado não encontrado.",
                    path: "usuario_id"
                }]
            );
        }
        
        const response = await EstacaoRepository.update(id, { ...estacao, usuario_id: usuario_id });
        if (!response) {
            throw new APIErro(400,
                [
                    {
                        message: "Não foi possível atualizar estação.",
                        path: "estacao"
                    }
                ]
            );
        }
        return response;
    };
};

export default EstacaoService;
