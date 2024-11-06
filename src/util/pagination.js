export default function pagination({ pagina, quantidade, total }) {
    //Esse vai pegar o objeto de paginação para retornar a API
    const totalPages = Math.ceil(total / limit);
    return {
        total: totalPages,
        quantidade: quantidade,
        pagina: pagina,
    }
}

export default function paginationFilter({ pagina, quantidade }) {
    //Esse vai retornar um objeto que serve de filtro para buscar no banco
    const skip = (pagina - 1) * quantidade;
    const take = quantidade;

    return {
        skip: skip,
        take: take,
    }
}