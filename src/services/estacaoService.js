import EstacaoRepository from "../repositories/estacaoRepository.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";
import EstacoesSchemas from "../schemas/estacoesSchemas.js";
import { z } from "zod";

class EstacaoService {
    static async listar(filtro) {
        try {
            const filtroSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                })).optional(),
                nome: z.string({
                    invalid_type_error: "Nome informado não é do tipo string."
                }).trim().optional(),
                endereco: z.string({
                    invalid_type_error: "Endereço informado não é do tipo string."
                }).trim().optional(),
                latitude: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Latitude informada não é do tipo number.",
                })).optional(),
                longitude: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Longitude informada não é do tipo number.",
                })).optional(),
                ip: z.string({
                    invalid_type_error: "Ip informado não é do tipo string.",
                }).ip({
                    message: "Ip informado não segue o padrão (IPv4 ou IPv6)."
                }).optional(),
                status: z.enum(['ativo', 'inativo'], {
                    invalid_type_error: "Status não é do tipo string.",
                    message: "Status informado não corresponde ao formato indicado (ativo ou inativo)."
                }).optional(),
                usuario_id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id do usuário informado não é do tipo number."
                }).int({
                    message: "Id do usuário informado não é um número inteiro."
                }).positive({
                    message: "Id do usuário informado não é um inteiro positivo."
                })).optional(),
            });
            const filtroValidated = filtroSchema.parse(filtro)
            const response = await EstacaoRepository.findMany(filtroValidated);
            if (response.length === 0) throw {
                error: true,
                code: 400,
                message: "Nenhuma estação encontrada.",
            }
            return response
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    };
                });
                throw {
                    error: true,
                    code: 400,
                    message: errorMessages,
                };
            } else {
                throw error;
            };
        };
    };

    static async listarPorID(id) {
        try {
            const idSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                }))
            });
            const parsedIdSchema = idSchema.parse(id);
            const response = await EstacaoRepository.findById(parsedIdSchema.id);
            if (!response) {
                throw {
                    error: true,
                    code: 400,
                    message: "Estação não encontrada.",
                };
            };
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    };
                });
                throw {
                    error: true,
                    code: 400,
                    message: errorMessages,
                };
            } else {
                throw error;
            };
        };
    };

    static async inserir(data) {
            const estacao = EstacoesSchemas.cadastrar.parse(data);
            const usuario = await UsuarioRepository.findById(estacao.usuario_id);
            if (!usuario || usuario.length === 0) throw {
                code: 400,
                error: {
                    mensage:"Usuário não encontrado.",
                    path: "usuario"
                },
            };
            const resposta = await EstacaoRepository.create(estacao);
            if (!resposta) throw {
                code: 400,
                error: {
                    mensage: "Erro ao cadastrar estação por favor verifique os dados.",
                    path: "estacao"
                }
                ,
            };
            return resposta;
    };

    static async atualizar(id, data) {
        try {
            const idSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                }))
            });
            const parsedIdSchema = idSchema.parse(id);
            const estacao = await EstacaoRepository.findById(parsedIdSchema.id);
            if (!estacao) throw {
                error: true,
                code: 400,
                message: "Estação não encontrado.",
            };
            const estacaoAtualizadaSchema = z.object({
                nome: z.string({
                    invalid_type_error: "Nome informado não é do tipo string.",
                }).optional(),
                endereco: z.string({
                    invalid_type_error: "Email informado não é do tipo string.",
                }).optional(),
                latitude: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Latitude informada não é do tipo number.",
                })).optional(),
                longitude: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Longitude informada não é do tipo number.",
                })).optional(),
                ip: z.string({
                    invalid_type_error: "Ip informado não é do tipo string.",
                }).ip({
                    message: "Formato de Ip inválido."
                }).optional(),
                status: z.enum(["ativo", "inativo"], {
                    invalid_type_error: "Status não é do tipo string.",
                    message: "Status informado não corresponde ao formato indicado (ativo ou inativo)."
                }).optional(),
                usuario_id: z.number({
                    invalid_type_error: "Id não é do tipo number."
                }).int({
                    message: "Id não é um tipo inteiro."
                }).positive({
                    message: "Id não é um inteiro positivo."
                }).optional()
            });
            const estacaoAtualizadaValidated = estacaoAtualizadaSchema.parse(data);
            const response = await EstacaoRepository.update(parsedIdSchema.id, estacaoAtualizadaValidated);
            if (!response) throw {
                error: true,
                code: 400,
                message: "Não foi possível atualizar estação.",
            };
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    };
                });
                throw {
                    error: true,
                    code: 400,
                    message: errorMessages,
                };
            } else {
                throw error;
            };
        };
    };
};

export default EstacaoService;
