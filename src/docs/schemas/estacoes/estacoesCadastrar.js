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

        properties: {
            data: {
                description: "Obejto resultado, cadastrado no banco de dados.",
                type: "array",
                example: []
            },
            code: {
                type: "int",
                example: 201,
                description: "Codigo http da requisição.",

            },
            message: {
                description: "Campo que mostra uma mensagem de resultado da requisição.",
                type: "string",
                example: "Requisição com sintaxe incorreta ou outros problemas!",
            },
            error: { type: "boolean", example: true },
            errors: {
                type: "array", example:
                    [
                        {
                            path: "nome",
                            message: "Nome é obrigatório."
                        },
                        {
                            path: "endereco",
                            message: "Email é obrigatório."
                        },
                        {
                            path: "latitude",
                            message: "Latitude informada não é do tipo number."
                        },
                        {
                            path: "longitude",
                            message: "Longitude informada não é do tipo number."
                        },
                        {
                            path: "ip",
                            message: "Ip é obrigatório."
                        },
                        {
                            path: "status",
                            message: "Status informado não corresponde ao formato indicado (ativo ou inativo)."
                        },
                        {
                            path: "usuario_id",
                            message: "Estação sem vínculo com usuário."
                        }
                    ]
            }
        },

    },
    estacoes_cadastrar_500: {
        properties: {
            data: {
                description: "Obejto resultado, cadastrado no banco de dados.",
                type: "array",
                example: []
            },
            code: {
                type: "int",
                example: 500,
                description: "Codigo http da requisição.",

            },
            message: {
                description: "Campo que mostra uma mensagem de resultado da requisição.",
                type: "string",
                example: "Requisição com sintaxe incorreta ou outros problemas!",
            },
            error: { type: "boolean", example: true },
            errors: {type: "array", example:[]}
        },

    },
};
export default estacoesCadastrarSchemas;
