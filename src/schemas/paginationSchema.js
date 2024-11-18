import { z } from 'zod';

class PaginationSchema{
    
    static schema = z.object({
        pagina: 
            z.preprocess((obj) => {
                if(parseInt(obj)) return parseInt(obj);
                return 1;
            },
                z.number()
            ).optional(),
        quantidade: 
            z.preprocess((obj) => {
                if(parseInt(obj)) return parseInt(obj);
                return 10;
            }, 
                z.number()
            ).optional(),
    });
    
}
export default PaginationSchema;
