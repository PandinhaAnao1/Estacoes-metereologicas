
class Paginacao {
    static pagination({ pagina, quantidade, total }) {
        const totalPages = Math.ceil(total / quantidade);
        return {
            total: totalPages,
            quantidade: quantidade,
            pagina: pagina,
        };
    }

    static paginationFilter({ pagina, quantidade }) {
        const skip = (pagina - 1) * quantidade;
        const take = quantidade;

        return {
            skip: skip,
            take: take,
        };
    }
}

export default Paginacao;