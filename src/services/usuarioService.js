import res from "express/lib/response.js";
import UsuarioRepository from "../repositories/usuarioRepository.js";
import UsuarioSchema from "../schemas/usuarioSchema.js";
import Hashsenha from "../util/hashSenha.js";
import { z } from "zod";

class UsuarioService {

    static async listar(filtro) {
        const filtroValidated = UsuarioSchema.listarUsuario.parse(filtro);
        
        const response = await UsuarioRepository.findMany(filtroValidated);
        response.forEach((e) => delete e.senha);
        if (response.length === 0) throw {
            error: true,
            code: 400,
            message: "Nenhum usuário encontrado.",
        };
        return response;
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
            const response = await UsuarioRepository.findById(parsedIdSchema.id);
            if (!response) {
                throw {
                    error: true,
                    code: 400,
                    message: "Usuário não encontrado.",
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
        try {
            const usuarioValidated = UsuarioSchema.cadastrarUsuario.parse(data);

            const emailRepetido = await UsuarioRepository.findMany({ email: data.email }) || [];
            if (emailRepetido.length > 0) {
                throw {
                    error: true,
                    code: 400,
                    message: "Email já cadastrado.",
                };
            }

            const hashSenha = await Hashsenha.criarHashSenha(data.senha);
            usuarioValidated.senha = hashSenha;
    
            const response = await UsuarioRepository.create(usuarioValidated);
            return {
                id: response.id,
                nome: response.nome,
                email: response.email
            };
    
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map(issue => ({
                    path: issue.path[0],
                    message: issue.message
                }));
                throw {
                    error: true,
                    code: 400,
                    message: errorMessages,
                };
            }
            throw error;
        }
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
            const usuario = await UsuarioRepository.findById(parsedIdSchema.id);
            if (!usuario) throw {
                error: true,
                code: 400,
                message: "Usuário não encontrado.",
            };
            const validacao = z.object({
                nome: z.string({
                    // required_error: "Campo Nome É Obrigatório!",
                    invalid_type_error: "Nome deve ser uma string."
                }).min(3, {
                    message: "Nome deve conter pelo menos 3 letras."
                }).optional(),
                email: z.string({
                    // required_error: "Campo Email É Obrigatório!",
                    invalid_type_error: "Email deve ser string."
                }).email({
                    message: "Email invalido."
                }).optional(),
                senha: z.string({
                    // required_error: "Campo Senha É Obrigatório!",
                    invalid_type_error: "Senha deve ser string."
                }).min(8, {
                    message: "Senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
                }).refine(
                    (value) =>
                        /[a-z]/.test(value) &&  // Tem pelo menos uma letra minúscula
                        /[A-Z]/.test(value) &&  // Tem pelo menos uma letra maiúscula
                        /[0-9]/.test(value) &&  // Tem pelo menos um número
                        /[^a-zA-Z0-9]/.test(value),  // Tem pelo menos um símbolo
                    {
                        message: "Senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
                    }
                ).optional()
            });
            const usuarioValidated = validacao.parse(data);
            if (usuarioValidated.senha != undefined) {
                //  hash senha
                const hashSenha = await Hashsenha.criarHashSenha(data.senha);
                usuarioValidated.senha = hashSenha;
            }
            if (usuarioValidated.email != undefined) {
                //  verificação do email repitido
                const emailRepetido = await UsuarioRepository.findMany({ email: data.email });
                if (emailRepetido.length != 0) {
                    if (parsedIdSchema.id != emailRepetido[0].id) {
                        throw {
                            error: true,
                            code: 400,
                            message: "Email já cadastrado.",
                        };
                    };
                };
            };
            const response = await UsuarioRepository.update(parsedIdSchema.id, usuarioValidated);
            delete response.senha;
            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((issue) => {
                    return {
                        path: issue.path[0],
                        message: issue.message
                    }
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

    static async deletar(filtro) {
            //PARA ESSA MODELAGEM DEVO VERIFICAR DEPOIS SE
            //Um usuario for deletado o que deve acontecer com
            //As estações dele?
            const {id} = UsuarioSchema.id.parse(filtro);
            const usuario = await UsuarioRepository.findById(id);
            if (!usuario || usuario.length === 0) {
                throw {
                    code: 400,
                    errorDetail: {
                        mensage:"O id do usuario informado não existe!",
                        path:"id"
                    },
                };
            };
            const response = await UsuarioRepository.delete(id);
           
            delete response.senha;
            return response;
          
    };
};

export default UsuarioService;