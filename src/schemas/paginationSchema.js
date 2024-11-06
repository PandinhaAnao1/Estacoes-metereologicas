import { z } from 'zod';


class PaginationSchema {
    static paginationSchema = z.object({
        pages: z.string().transform((val) => parseInt(val, 10)),
        limit: z.string().transform((val) => parseInt(val, 10))
    });

}

export default PaginationSchema;
