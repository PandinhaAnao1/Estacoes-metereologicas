const cadastrarSchemas = {
    
    usuario_cadastrar_201: {
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
            error: {
                type: "boolean",
                example: false
            },
            code: {
                type: "integer",
                example: 201
            },
            message: {
                type: "string",
                example: "Usuário cadastrado com sucesso!"
            }
        }
    },

    usuario_cadastrar_400: {
        properties: {
            error: { 
                type: "boolean", 
                example: true 
            },
            code: { 
                type: "int", 
                example: 400 
            },
            errors: { 
                type: "array", 
                example: 
                [
                    "Campo Nome É Obrigatório!", 
                    "O nome tem que ser String", 
                    "O Nome Deve Conter Pelo Menos 3 Letras!", 
                    "Campo Email É Obrigatório!", 
                    "O Email Tem Que Ser String", 
                    "Email Invalido!", 
                    "Campo Senha É Obrigatório!", 
                    "O Senha Tem Que Ser String", 
                    "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.", 
                    "Email Já Cadastrado!"
                ] 
            }

        }
    }
}

export default cadastrarSchemas;