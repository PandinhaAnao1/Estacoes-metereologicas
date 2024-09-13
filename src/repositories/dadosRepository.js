import { prisma } from "../configs/prismaClient.js"

class DadosRepository {
    static async findMany(filtro) {
        return await prisma.dados_diarios.findMany({ where: filtro });
    }

    static async create(data) {
        return await prisma.dados_diarios.create({ data: data });
    }
}

export default DadosRepository;