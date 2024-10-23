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

    static async listarPorID(filtro) {
            const {id} = UsuarioSchema.id.parse(filtro);
            const response = await UsuarioRepository.findById(id);
            if (!response) {
                throw {
                    error: true,
                    code: 400,
                    message: "Usuário não encontrado.",
                };
            };
            return response;
    };

    static async inserir(data) {
        const usuarioValidated = UsuarioSchema.cadastrarUsuario.parse(data);

            const emailRepetido = await UsuarioRepository.findMany({ email: data.email }) || [];
            if (emailRepetido.length > 0) {
                throw {
                    code: 400,
                    errors: [
                        {
                            message: "Email já cadastrado!",
                            path: "email"
                        }
                    ]
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
    };

    static async atualizar(id, data) {
        const parsedIdSchema = UsuarioSchema.id.parse(id);
            const usuario = await UsuarioRepository.findById(parsedIdSchema.id);
            if (!usuario) throw {
                error: true,
                code: 400,
                message: "Usuário não encontrado.",
            };

            const usuarioValidated = UsuarioSchema.atualizarUsuario.parse(data);
            if (usuarioValidated.senha != undefined) {
                //  hash senha
                const hashSenha = await Hashsenha.criarHashSenha(data.senha);
                usuarioValidated.senha = hashSenha;
            }
            if (usuarioValidated.email != undefined) {
                //  verificação do email repetido
                const emailRepetido = await UsuarioRepository.findMany({ email: data.email });
                if (emailRepetido.length != 0) {
                    if (parsedIdSchema.id != emailRepetido[0].id) {
                        throw {
                            code: 400,
                            errors: [
                                {
                                    message: "Email já cadastrado!",
                                    path: "email"
                                }
                            ]
                        };
                    };
                };
            };
            const response = await UsuarioRepository.update(parsedIdSchema.id, usuarioValidated);
            delete response.senha;
            return response;
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