

const estacoesAtualizar = {


    estacoes_atualizar_200: {
        type: "object",
        example: {
            id: 1,
            nome: "Estação Central",
            endereco: "Rua 1, Centro",
            latitude: -46.6333,
            longitude: -23.5505,
            ip: "192.168.0.1",
            status: "ativo",
            usuario_id: 1
        }
    },

    estacoes_atualizar_400: {
        type: "array",
        example: [
            {
                mensage: "Estacao não encontrada",
                path:'id',
            }
        ]
    }
}

export default estacoesAtualizar;