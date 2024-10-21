const estacoesCadastrarSchemas = {

    estacoes_cadastrar_post_body: {
        type: "object",
        properties: {
            nome: {
                type: "string",
                example: "vindcator"
            },
            endereco: {
                type: "string",
                example: "rua teste api 2024"
            },
            latitude: {
                type: "string",
                example: "11"
            },
            longitude: {
                type: "string",
                example: "11"
            },
            ip: {
                type: "string",
                example: "192.158.1.38"
            },
            status: {
                type: "string",
                example: "ativo"
            },
            usuario_id: {
                type: "integer",
                example: 1
            }
        },
        required: ["nome", "endereco", "latitude", "longitude", "ip", "status", "usuario_id"]
    },
    deltar_400: {
        type: "object",
        properties: {
            data: {
                type: "array",
                example: [],
                items: {
                    type: "object"
                },
                description: "Array de dados. Vazio em caso de erro."
            },
            error: {
                type: "boolean",
                description: "Indica se houve erro na requisição.",
                example: true
            },
            code: {
                type: "integer",
                description: "Código de status HTTP retornado.",
                example: 400
            },
            message: {
                type: "string",
                description: "Descrição do erro geral ocorrido na requisição.",
                example: "Requisição com sintaxe incorreta ou outros problemas."
            },
            errors: {
                type: "array",
                description: "Lista de erros específicos encontrados.",
                items: {
                    type: "object",
                    properties: {
                        mensage: {
                            type: "string",
                            description: "Mensagem específica do erro.",
                            example: "O id do usuario informado não existe!"
                        },
                        path: {
                            type: "string",
                            description: "Caminho do campo com erro.",
                            example: "id"
                        }
                    }
                }
            }
        }
    },
    deltar_500: {
        type: "object",
        properties: {
            data: {
                type: "array",
                example: [],
                items: {
                    type: "object"
                },
                description: "Array de dados. Vazio em caso de erro."
            },
            error: {
                type: "boolean",
                description: "Indica se houve erro na requisição.",
                example: true
            },
            code: {
                type: "integer",
                description: "Código de status HTTP retornado.",
                example: 500
            },
            message: {
                type: "string",
                description: "Descrição do erro geral ocorrido na requisição.",
                example: "Servidor encontrou um erro interno."
            },
            errors: {
                type: "array",
                description: "Lista de erros específicos encontrados.",
                items: {
                    type: "object"
                },
                example: []
            }
        }
    },


};

export default estacoesCadastrarSchemas;
