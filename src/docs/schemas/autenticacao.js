import { type } from "express/lib/response";

const autenticaoSchemas = {

    usario: {
        nome: "Fernanda Alves",
        email: "fernanda@example.com"
    },

    response: {
        type: 'object',
        example: {
            error: false,
            code: 200,
            errors: [],
            data: {
                id: 9,
                ...usario
            }
        }
    }

};

export default bensSchemas;
