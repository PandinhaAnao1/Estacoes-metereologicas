const atualizarSchemas = {
    usuario_atualizar_200: {
        type: "object",
            properties: {
                data: {
                type: "object",
                example: {
                    id: 1,
                    nome: "marcos",
                    email: "1marcos@gmail.com",
                    }
                  },
            error: { type: "boolean", example: false },
            code: { type: "int", example: 200 },
            message: { type: "string", example: "Usuario atualizado com sucesso!!!" }
        }
    },

    usuario_atualizar_400: {
        type: "object",
            properties: {
            error: { type: "boolean", example: true },
            code: { type: "int", example: 400 },
            message: { type: "array", example: ["Campo Nome É Obrigatório!" , "O nome tem que ser String", "O Nome Deve Conter Pelo Menos 3 Letras!", "Campo Email É Obrigatório!", "O Email Tem Que Ser String", "Email Invalido!", "Campo Senha É Obrigatório!", "O Senha Tem Que Ser String", "A senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um símbolo."] }
        }
    }
}

export default atualizarSchemas;