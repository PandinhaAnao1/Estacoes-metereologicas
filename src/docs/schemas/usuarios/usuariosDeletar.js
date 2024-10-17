const deletarSchemas = {

    deltar_204: {
        type: "object",
        properties: {
            error: {
                type: "boolean",
                example: false
            },
            code: {
                type: "integer",
                example: 204
            },
            message: {
                type: "string",
                example: "Usuario deletado com sucesso."
            }
        }
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

export default deletarSchemas;
