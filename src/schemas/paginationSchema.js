import { z } from 'zod';


class PaginationSchema {
    static paginationSchema = z.object({
        pagina: z.string().transform((val) => parseInt(val, 1)),
        quantidade: z.string().transform((val) => parseInt(val, 10))
    });

}

export default PaginationSchema;
