import { z } from "zod";

class EstacoesSchemas {
    

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

    static cadastrar = z.object({
        nome: z.string({
            invalid_type_error: "Nome informado não é do tipo string.",
            required_error: "Nome é obrigatório.",
        }),
        endereco: z.string({
            invalid_type_error: "Email informado não é do tipo string.",
            required_error: "Email é obrigatório.",
        }),
        latitude: z.preprocess((val) => Number(val), z.number({
            invalid_type_error: "Latitude informada não é do tipo number.",
            required_error: "Latitude é obrigatória."
        })),
        longitude: z.preprocess((val) => Number(val), z.number({
            invalid_type_error: "Longitude informada não é do tipo number.",
            required_error: "Longitude é obrigatória."
        })),
        ip: z.string({
            invalid_type_error: "Ip informado não é do tipo string.",
            required_error: "Ip é obrigatório.",
        }).ip({
            message: "Formato de ip inválido."
        }),
        status: z.enum(["ativo", "inativo"], {
            invalid_type_error: "Status não é do tipo string.",
            required_error: "Status é obrigatório",
            message: "Status informado não corresponde ao formato indicado (ativo ou inativo)."
        }),
        usuario_id: z.number({
            required_error: "Estação sem vínculo com usuário.",
            invalid_type_error: "Id não é do tipo number."
        }).int({
            message: "Id não é um tipo inteiro."
        }).positive({
            message: "Id não é um inteiro positivo."
        })
    });
    
    static id= z.object({
        id: z.preprocess((val) => Number(val), z.number({
            invalid_type_error: "Id informado não é do tipo number.",
        }).int({
            message: "Id informado não é um número inteiro."
        }).positive({
            message: "Id informado não é positivo."
        }))
    });


}

export default EstacoesSchemas;