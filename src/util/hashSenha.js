import bcrypt from 'bcryptjs';

class HashSenha {
    static criarHashSenha = async (senha) => {
        return await bcrypt.hash(senha, process.env.SALT);
    }

    static compararSenha = async (senha, hash) => {
        return await bcrypt.compare(senha, hash);
    }
}


export default HashSenha