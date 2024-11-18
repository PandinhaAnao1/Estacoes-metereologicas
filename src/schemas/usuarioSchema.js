import { z } from "zod";
    
class UsuarioSchema{
    static cadastrarUsuario = z.object({
        nome: z.string({
            required_error: "Campo nome é obrigatório.",
            invalid_type_error: "Nome deve ser do tipo string."
        }).min(3, {
            message: "Nome deve conter pelo menos 3 letras."
        }),
        email: z.string({
            required_error: "Campo email é obrigatório.",
            invalid_type_error: "Email deve ser do tipo string."
        }).email({
            message: "Email invalido."
        }),
        senha: z.string({
            required_error: "Campo senha é obrigatório.",
            invalid_type_error: "Senha deve ser do tipo string."
        }).min(8).refine(
            (value) =>
                /[a-z]/.test(value) &&  // Tem pelo menos uma letra minúscula
                /[A-Z]/.test(value) &&  // Tem pelo menos uma letra maiúscula
                /[0-9]/.test(value) &&  // Tem pelo menos um número
                /[^a-zA-Z0-9]/.test(value),  // Tem pelo menos um símbolo
            {
                message: "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
            }
        )
    });

    static listarUsuario = z.object({
        id: z.preprocess((val) => Number(val), z.number({
            invalid_type_error: "Id informado não é do tipo number.",
        }).int({
            message: "Id informado não é um número inteiro."
        }).positive({
            message: "Id informado não é positivo."
        })).optional(),
        nome: z.string({
            invalid_type_error: "Nome informado não é do tipo string."
        }).trim().optional(),
        email: z.string({
            invalid_type_error: "Email informado deve ser do tipo string."
        }).email({
            message: "Email invalido."
        }).optional(),
    });

    static atualizarUsuario = z.object({
        nome: z.string({
            // required_error: "Campo Nome É Obrigatório!",
            invalid_type_error: "Nome deve ser uma string."
        }).min(3, {
            message: "Nome deve conter pelo menos 3 letras."
        }).optional(),
        email: z.string({
            // required_error: "Campo Email É Obrigatório!",
            invalid_type_error: "Email deve ser string."
        }).email({
            message: "Email invalido."
        }).optional(),
        senha: z.string({
            // required_error: "Campo Senha É Obrigatório!",
            invalid_type_error: "Senha deve ser string."
        }).min(8, {
            message: "Senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
        }).refine(
            (value) =>
                /[a-z]/.test(value) &&  // Tem pelo menos uma letra minúscula
                /[A-Z]/.test(value) &&  // Tem pelo menos uma letra maiúscula
                /[0-9]/.test(value) &&  // Tem pelo menos um número
                /[^a-zA-Z0-9]/.test(value),  // Tem pelo menos um símbolo
            {
                message: "Senha deve conter pelo menos 8 caracteres, uma letra minúscula, uma letra maiúscula, um número e um símbolo.",
            }
        ).optional()
    });

    static id = z.object({
        id: z.preprocess((val) => Number(val),
            z.number({
                invalid_type_error: "Id informado não é do tipo number.",
            }).int({
                message: "Id informado não é um número inteiro."
            }).positive({
                message: "Id informado não é positivo."
            }),
        )
    });
}

export default UsuarioSchema;