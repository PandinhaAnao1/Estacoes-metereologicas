
const estacaoListarIdSchema = {

    estacoes_listarPorId_200: {
        type: 'objetc', example:{
            id: 5,
            nome: "Estação Oeste",
            endereco: "Rua 5, Oeste",
            latitude: -46.637,
            longitude: -23.554,
            ip: "192.168.0.5",
            status: "ativo",
            usuario_id: 5
        }
    },
    estacoes_listarPorId_400: {
        type: "array",
        example: [
            {
                mensage: "Estacao não encontrada",
                path:'id',
            }
        ]

    }
}

export default estacaoListarIdSchema;