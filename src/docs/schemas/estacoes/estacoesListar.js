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

};
export default estacoesListarSchemas;
