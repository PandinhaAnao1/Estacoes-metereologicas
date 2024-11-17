import { prisma } from "../configs/prismaClient.js"

class DadosRepository {
    static async countItens(filtro) {
        return await prisma.dados_diarios.count({ where: filtro });
    }
    static async findMany(filtro,pagination) {
        return await prisma.dados_diarios.findMany({ where: filtro, ...pagination});
    }

    static async create(data) {
        return await prisma.dados_diarios.create({ data: data });
    }
}

export default DadosRepository;