const autenticaoSchemas = {


    autenticao_201: {
        type: 'object',
        example: {
            error: false,
            message: "Token gerado com sucesso!",
            token: "TOKENEXEMPLOTOKENEXEMPLOTOKENEXEMPLOTOKENEXEMPLOTOKENEXEMPLOTOKENEXEMPLO",
            code: 201,
            errors: [],
            data: {
                id: 9,
                nome: "Fernanda Alves",
                email: "fernanda@example.com"
            },
        }
    },
    autenticao_400: {
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
    autenticao_500: {
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

export default autenticaoSchemas;
