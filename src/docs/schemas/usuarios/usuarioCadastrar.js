const cadastrarSchemas = {
    usuario_cadastrar_201: {
        type: "object",
        example: {
            id: 1,
            nome: "marcos",
            email: "1marcos@gmail.com",
        }
    },
    usuario_cadastrar_400: {
        type: "array",
        example: [
            {
                message: "Formato de email inválido",
                path: "email"
            },
            {
                message: "Nome é obrigatório",
                path: "nome"
            },
            {
                message: "A senha deve ter pelo menos 6 caracteres",
                path: "senha"
            }
        ]
    }
}

export default cadastrarSchemas;