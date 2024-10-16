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
        type: 'object',
        example: {
            error: true,
            message: "Ocorreu um erro ao gerar o token!",
            code: 400,
            data: {},
            errors: [
                {
                    path: "autenticacao",
                    mensage: "Erro especifico para autenticação"
                }
            ],
        }
    },
    deltar_500: {
        type: 'object',
        example: {
            error: true,
            message: "Ocorreu um erro interno na aplicação por favor tente novamente mais tarde!",
            code: 500,
            data: {},
            errors: [],
        }
    }
};

export default deletarSchemas;
