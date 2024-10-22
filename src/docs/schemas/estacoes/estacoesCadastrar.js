const estacoesCadastrarSchemas = {

    estacoes_cadastrar_post_body: {
        type: "object",
        properties: {
            nome: {
                type: "string",
                example: "vindcator",
                description: "Nome de uma nova estação."

            },
            endereco: {
                type: "string",
                example: "rua teste api 2024",
                description: "Decrição de endereço da estação."

            },
            latitude: {
                type: "string",
                example: "11",
                description: "Posição de latitude no globo que se localiza a estação."

            },
            longitude: {
                type: "string",
                example: "11",
                description: "Posição de longitude no globo que se localiza a estação."

            },
            ip: {
                type: "string",
                example: "192.158.1.38",
                description: "Ip campo que representa uma estalção estaticca."

            },
            status: {
                type: "string",
                example: "ativo",
                description: "Campo que representa se uma estação esta ativa ou não."

            },
            usuario_id: {
                type: "integer",
                example: 1,
                description: "Numero que representa a referencia de um usuario."

            }
        },
        required: ["nome", "endereco", "latitude", "longitude", "ip", "status", "usuario_id"]
    },
    estacoes_cadastrar_201: {
        properties: {
            data: {
                description: "Obejto resultado, cadastrado no banco de dados.",
                type: "object",
                example: {
                    id: 1,
                    nome: "vindcator",
                    endereco: "rua teste api 2024",
                    latitude: "11",
                    longitude: "11",
                    ip: "192.158.1.38",
                    status: "ativo",
                    usuario_id: 1
                }
            },
            error: {
                description: "Variavel que indica se ocorreu um erro ou não.",
                type: "boolean",
                example: false,
            },
            code: {
                type: "int",
                example: 201,
                description: "Codigo http da requisição.",

            },
            message: {
                description: "Campo que mostra uma mensagem de resultado da requisição.",
                type: "string",
                example: "Estação cadastrada com sucesso!",
            },
            errors: {
                description: "Lista de erros que ocorreram durante a requisição.",
                type: "Array",
                example: [],
            }
        }
    },
    estacoes_cadastrar_400: {
        type: "object",

        properties:{
            type: "object",
            properties: {
                error: { type: "boolean", example: true },
                code: { type: "int", example: 400 },
                message: {
                    type: "array", example:
                        [
                            { "mensagem": "Nome informado não é do tipo string", "path": "estacoes" },
                            { "mensagem": "Nome é obrigatório", "path": "estacoes" },
                            { "mensagem": "Email informado não é do tipo string", "path": "estacoes" },
                            { "mensagem": "Email é obrigatório", "path": "estacoes" },
                            { "mensagem": "Latitude informada não é do tipo number", "path": "estacoes" },
                            { "mensagem": "Latitude é obrigatória", "path": "estacoes" },
                            { "mensagem": "Longitude informada não é do tipo number", "path": "estacoes" },
                            { "mensagem": "Longitude é obrigatória", "path": "estacoes" },
                            { "mensagem": "IP informado não é do tipo string", "path": "estacoes" },
                            { "mensagem": "IP é obrigatório", "path": "estacoes" },
                            { "mensagem": "Formato de IP inválido", "path": "estacoes" },
                            { "mensagem": "Status não é do tipo string", "path": "estacoes" },
                            { "mensagem": "Status é obrigatório", "path": "estacoes" },
                            { "mensagem": "Status informado não corresponde ao formato indicado (ativo ou inativo)", "path": "estacoes" },
                            { "mensagem": "Estação sem vínculo com usuário", "path": "estacoes" },
                            { "mensagem": "ID não é do tipo number", "path": "estacoes" },
                            { "mensagem": "ID não é um tipo inteiro", "path": "estacoes" },
                            { "mensagem": "ID não é um inteiro positivo", "path": "estacoes" },
                            { "mensagem": "Usuário não encontrado", "path": "estacoes" },
                            { "mensagem": "Erro ao cadastrar estação", "path": "estacoes" },
                        ]
                }
            }
        },
       
    },


};

export default estacoesCadastrarSchemas;
