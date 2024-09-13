import { prisma } from '../src/configs/prismaClient.js'

async function seed() {

    // Deleta todos os dados existentes nas tabelas
    await prisma.dados_diarios.deleteMany();
    await prisma.estacao.deleteMany();
    await prisma.usuario.deleteMany();

    // Insere novos dados na tabela `usuario`
    await prisma.usuario.createMany({
        data: [
            { id: 1, nome: 'Carlos Silva', email: 'carlos@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
            { id: 2, nome: 'Ana Pereira', email: 'ana@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
            { id: 3, nome: 'João Souza', email: 'joao@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
            { id: 4, nome: 'Maria Oliveira', email: 'maria@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
            { id: 5, nome: 'Lucas Lima', email: 'lucas@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
            { id: 6, nome: 'Beatriz Santos', email: 'beatriz@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
            { id: 7, nome: 'Pedro Costa', email: 'pedro@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
            { id: 8, nome: 'Julia Gomes', email: 'julia@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
            { id: 9, nome: 'Fernanda Alves', email: 'fernanda@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
            { id: 10, nome: 'Rodrigo Ramos', email: 'rodrigo@example.com', senha: '$2a$10$BZT9CNJZ6Nd7RzRd.04Wp.wyGgRA2nN7grTQgCvDySzoepww.WCA6' },
        ],
    });

    // Insere novos dados na tabela `estacao`
    await prisma.estacao.createMany({
        data: [
            { id: 1, nome: 'Estação Central', endereco: 'Rua 1, Centro', longitude: -23.5505, latitude: -46.6333, ip: '192.168.0.1', status: 'ativo', usuario_id: 1 },
            { id: 2, nome: 'Estação Norte', endereco: 'Rua 2, Norte', longitude: -23.5510, latitude: -46.6340, ip: '192.168.0.2', status: 'ativo', usuario_id: 2 },
            { id: 3, nome: 'Estação Sul', endereco: 'Rua 3, Sul', longitude: -23.5520, latitude: -46.6350, ip: '192.168.0.3', status: 'ativo', usuario_id: 3 },
            { id: 4, nome: 'Estação Leste', endereco: 'Rua 4, Leste', longitude: -23.5530, latitude: -46.6360, ip: '192.168.0.4', status: 'ativo', usuario_id: 4 },
            { id: 5, nome: 'Estação Oeste', endereco: 'Rua 5, Oeste', longitude: -23.5540, latitude: -46.6370, ip: '192.168.0.5', status: 'ativo', usuario_id: 5 },
            { id: 6, nome: 'Estação 6', endereco: 'Rua 6', longitude: -23.5550, latitude: -46.6380, ip: '192.168.0.6', status: 'ativo', usuario_id: 6 },
            { id: 7, nome: 'Estação 7', endereco: 'Rua 7', longitude: -23.5560, latitude: -46.6390, ip: '192.168.0.7', status: 'ativo', usuario_id: 7 },
            { id: 8, nome: 'Estação 8', endereco: 'Rua 8', longitude: -23.5570, latitude: -46.6400, ip: '192.168.0.8', status: 'ativo', usuario_id: 8 },
            { id: 9, nome: 'Estação 9', endereco: 'Rua 9', longitude: -23.5580, latitude: -46.6410, ip: '192.168.0.9', status: 'ativo', usuario_id: 9 },
            { id: 10, nome: 'Estação 10', endereco: 'Rua 10', longitude: -23.5590, latitude: -46.6420, ip: '192.168.0.10', status: 'ativo', usuario_id: 10 },
        ],
    });

    // Insere novos dados na tabela `dados_diarios`
    await prisma.dados_diarios.createMany({
        data: [
            { id: 1, temperature: "25.3", humidity: 60, rainfall: 5, wind_speed_kmh: 12, data_hora: new Date() },
            { id: 2, temperature: "26.7", humidity: 65, rainfall: 4, wind_speed_kmh: 14, data_hora: new Date() },
            { id: 3, temperature: "24.1", humidity: 58, rainfall: 3, wind_speed_kmh: 10, data_hora: new Date() },
            { id: 4, temperature: "27.4", humidity: 70, rainfall: 6, wind_speed_kmh: 16, data_hora: new Date() },
            { id: 5, temperature: "23.9", humidity: 55, rainfall: 2, wind_speed_kmh: 8, data_hora: new Date() },
            { id: 6, temperature: "28.2", humidity: 72, rainfall: 6, wind_speed_kmh: 18, data_hora: new Date() },
            { id: 7, temperature: "22.8", humidity: 50, rainfall: 2, wind_speed_kmh: 6, data_hora: new Date() },
            { id: 8, temperature: "29.0", humidity: 75, rainfall: 7, wind_speed_kmh: 20, data_hora: new Date() },
            { id: 9, temperature: "21.5", humidity: 48, rainfall: 2, wind_speed_kmh: 4, data_hora: new Date() },
            { id: 10, temperature: "30.3", humidity: 78, rainfall: 8, wind_speed_kmh: 22, data_hora: new Date() },
        ],
    });

    console.log('Seed criado com sucesso!');
}

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });