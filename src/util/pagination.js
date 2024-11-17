
class Paginacao {
    static pagination( pagina, quantidade, total ) {
        return {
            total: total,
            quantidade: quantidade,
            pagina: pagina,
        };
    }

    static paginationFilter( pagina, quantidade ) {
        const skip = (pagina - 1) * quantidade;
        const take = quantidade;

        return {
            skip: skip,
            take: take,
        };
    }
}

export default Paginacao;