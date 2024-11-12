const estacoesListarSchemas = {

    estacoes_listar_200: {

        type: 'array',
        example: [
            {
                id: 1,
                nome: "Estação Central",
                endereco: "Rua Exemplo, 123",
                latitude: "11.1111",
                longitude: "22.2222",
                ip: "192.168.1.1",
                status: "ativo",
                usuario_id: 1
            },
            {
                id: 2,
                nome: "Estação Norte",
                endereco: "Avenida Exemplo, 456",
                latitude: "33.3333",
                longitude: "44.4444",
                ip: "192.168.1.2",
                status: "inativo",
                usuario_id: 2
            }
        ]
    },

    estacoes_listar_400: {

        type: "Array",
        example: [

            {
                path: "nome",
                message: "Requisição com sintaxe incorreta ou outros problemas!",

            }
        ]
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
            errors: { type: "array", example: [] }
        },

    },
};
export default estacoesListarSchemas;
