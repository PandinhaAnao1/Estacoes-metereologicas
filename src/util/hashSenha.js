import bcrypt from 'bcryptjs';

class Hashsenha {
    static criarHashSenha = async (senha) => {
        const hashedPassword = await bcrypt.hash(senha, 10)
        return hashedPassword
    }

    static compararSenha = async (senha, hash) => {
        const passwordMatch = await bcrypt.compare(senha, hash);
        return passwordMatch
        
    }
}


export default Hashsenha