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


};

export default deletarSchemas;
