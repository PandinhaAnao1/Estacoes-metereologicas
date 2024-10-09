import {z} from "zod";

class UsuarioSchema{
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
    })

    static listarUsuarioPorID = z.object({
        id: z.preprocess((val) => Number(val), z.number({
            invalid_type_error: "Id informado não é do tipo number.",
        }).int({
            message: "Id informado não é um número inteiro."
        }).positive({
            message: "Id informado não é positivo."
        }))
    });
}

export default UsuarioSchema;