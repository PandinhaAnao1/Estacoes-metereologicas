import UsuarioRepository from "../repositories/usuarioRepository.js";
import UsuarioSchema from "../schemas/usuarioSchema.js";
import Hashsenha from "../util/hashSenha.js";
import { APIErro } from "../util/apiErrro.js";
import Paginacao from "../util/pagination.js";
import PaginationSchema from "../schemas/paginationSchema.js";

class UsuarioService {

    static async listar(filtro) {
        const filtros = UsuarioSchema.listarUsuario.parse(filtro);
        const { pagina = 1, quantidade = 10 } = PaginationSchema.schema.parse(filtro);

        const total = await UsuarioRepository.countItens(filtros);
    
        if (total === 0) {
            throw new APIErro(
                400,
                [{
                    message: "Nenhum usuário encontrado verifique os parâmetros!",
                    path: "parâmetros"
                }]
            );
        };
        
        const paginado = Paginacao.paginationFilter( pagina, quantidade);
        const response = await UsuarioRepository.findMany(filtros, paginado);
        
        const paginacao = Paginacao.pagination( pagina, quantidade, total );
        response.forEach((e) => delete e.senha);
        
        return {
            data: response,
            ...paginacao
        };
    };

    static async listarPorID(filtro) {
        const { id } = UsuarioSchema.id.parse(filtro);
        const response = await UsuarioRepository.findById(id);
        if (!response) {
            throw new APIErro(
                400,
                [{
                    message: "Nenhum usuário encontrado verifique o id!",
                    path: "id"
                }]);
        };
        return response;
    };

    static async inserir(data) {
        const usuarioValidated = UsuarioSchema.cadastrarUsuario.parse(data);

            const emailRepetido = await UsuarioRepository.findMany({ email: data.email }) || [];
            if (emailRepetido.length > 0) {
                throw new APIErro(400,
                    [
                        {
                            message: "Email já cadastrado!",
                            path: "email"
                        }
                    ]);
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

    static async atualizar(filtro) {

        const {id} = UsuarioSchema.id.parse(filtro);
            const usuario = await UsuarioRepository.findById(id);
            if (!usuario || usuario.length == 0) {
                throw new APIErro(
                    400,
                    [{
                        path:"id",
                        message:"Usuário não encontrado."
                    }]
                );
            };

            const {nome,email,senha} = UsuarioSchema.atualizarUsuario.parse(filtro);
            let usuarioAtualizado = {};
            if(nome != undefined){
                usuarioAtualizado.nome = nome;
            }
            if (senha != undefined) {
                //  hash senha
                const hashSenha = await Hashsenha.criarHashSenha(senha);
                usuarioAtualizado.senha = hashSenha;
            }
            if (email != undefined) {
                //  verificação do email repetido
                const emailRepetido = await UsuarioRepository.findMany({ email: email });
                if (emailRepetido.length != 0) {
                    if (id != emailRepetido[0].id) {
                        throw new APIErro(
                            400,
                            [{
                                    message: "Email já cadastrado!",
                                    path: "email"
                            }]
                        );
                    };
                };
                usuarioAtualizado.email = email;
            };
            const response = await UsuarioRepository.update(id, usuarioAtualizado);
            delete response.senha;
            return response;
    };

    static async deletar(filtro) {
        //PARA ESSA MODELAGEM DEVO VERIFICAR DEPOIS SE
        //Um usuario for deletado o que deve acontecer com
        //As estações dele?
        const { id } = UsuarioSchema.id.parse(filtro);
        const usuario = await UsuarioRepository.findById(id);
        if (!usuario || usuario.length === 0) {
            throw new APIErro(
                400,
                [{
                    message: "O id do usuario informado não existe!",
                    path: "id"
                }]
            );

        };
        const response = await UsuarioRepository.delete(id);

        delete response.senha;
        return response;

    };
};

export default UsuarioService;