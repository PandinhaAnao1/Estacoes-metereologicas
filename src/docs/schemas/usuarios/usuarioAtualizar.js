const atualizarSchemas = {
    usuario_atualizar_200: {
        type: "object",
        example: {
            id: 1,
            nome: "marcos",
            email: "1marcos@gmail.com",
        }
    },

    usuario_atualizar_400: {
        type: "object",
        example: [
            {
                path: "nome",
                message: "Nome é obrigatório"
            },
            {
                path: "email",
                message: "Email é obrigatório"
            },
            {
                path: "senha",
                message: "Senha é obrigatória"
            }
        ]
    }
}

export default atualizarSchemas;