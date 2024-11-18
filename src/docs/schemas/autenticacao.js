const autenticaoSchemas = {


    autenticao_201: {
        type: 'object',
        example: {
            token: "TOKENEXEMPLOTOKENEXEMPLOTOKENEXEMPLOTOKENEXEMPLOTOKENEXEMPLOTOKENEXEMPLO",
            id: 9,
            nome: "Fernanda Alves",
            email: "fernanda@example.com"
        }
    },
    autenticao_400: {
        type: 'object',
        example: [
            {
                path: "email",
                mensage: "Email informado é invalido!"
            }
        ],
    },
 
};

export default autenticaoSchemas;
