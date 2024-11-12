import { prisma } from "../configs/prismaClient.js"

class EstacaoRepository {
    static async findMany(filtro, paginacao) {
        return await prisma.estacao.findMany({
            where: filtro,
            ...paginacao ?? {},
        });
    };
    static async countItens(filtro) {
        return await prisma.estacao.count({ where: filtro });
    }

    static async findById(id) {
        return await prisma.estacao.findUnique({ where: { id: id } });
    };

    static async create(data) {
        return await prisma.estacao.create({ data: data });
    };

    static async update(id, data) {
        return await prisma.estacao.update({ where: { id: id }, data });
    };

};

export default EstacaoRepository;