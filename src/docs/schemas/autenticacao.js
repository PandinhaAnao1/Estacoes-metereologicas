import { type } from "express/lib/response";

const autenticaoSchemas = {

    usario: {
        id: 9,
        nome: "Fernanda Alves",
        email: "fernanda@example.com"
    },

    response201: {
        type: 'object',
        example: {
            error: false,
            code: 200,
            errors: [],
            data: {
                ...usario
            }
        }
    }

};

export default autenticaoSchemas;
