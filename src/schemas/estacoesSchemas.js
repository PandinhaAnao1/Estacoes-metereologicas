import { z } from "zod";

class EstacoesSchema {
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

export default EstacoesSchema;