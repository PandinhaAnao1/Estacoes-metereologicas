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
