import { describe, expect, test } from '@jest/globals';
import EstacaoService from '../../services/estacaoService.js';
import EstacaoRepository from '../../repositories/estacaoRepository.js';
import UsuarioRepository from '../../repositories/usuarioRepository.js';

jest.mock('../../repositories/estacaoRepository.js', () => ({
    findMany: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
}));

jest.mock('../../repositories/usuarioRepository.js', () => ({
    findById: jest.fn()
}));

describe('EstacaoSevices.listarPorId', () => {
    const estacaoMock = {
        id: 1,
        nome: 'Estação Teste',
        endereco: 'Rua Teste, 123',
        latitude: -23.550520,
        longitude: -46.633308,
        ip: '192.168.0.1',
        status: 'ativo',
        usuario_id: 1
    };

    beforeEach(() => {
        jest.spyOn(EstacaoRepository, 'findById').mockImplementation((id) => {
            if (id === 1) {
                return Promise.resolve(estacaoMock);
            } else {
                return Promise.resolve(null); // Retorna null para IDs que não existem
            }
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Deve listar estações com base no id', async () => {
        const response = await EstacaoService.listarPorID({ id: 1 });

        expect(response).toBeDefined();
        expect(response.id).toBe(1);
        expect(response).toEqual(estacaoMock);
    });

    it('Deve retornar erro: "Estação não encontrada."', async () => {
        try {
            await EstacaoService.listarPorID({ id: 44454 });
        } catch (error) {
            expect(error).toEqual({
                error: true,
                code: 400,
                message: "Estação não encontrada."
            });
        }
    });

    it('Deve retornar erro: "Id informado não é do tipo number."', async () => {
    try {
        await EstacaoService.listarPorID({ id: 'errado' });
    } catch (error) {
        expect(error).toEqual({
            error: true,
            code: 400,
            message: [
                { message: 'Id informado não é do tipo number.', path: 'id' }
            ]
        });
    }
});

});


describe('EstacaoService.listar', () => {
    const estacoesMock = [
        {
            id: 1,
            nome: 'Estação Teste 1',
            endereco: 'Rua Teste 1, 123',
            latitude: -23.550520,
            longitude: -46.633308,
            ip: '192.168.0.1',
            status: 'ativo',
            usuario_id: 1
        },
        {
            id: 2,
            nome: 'Estação Teste 2',
            endereco: 'Rua Teste 2, 456',
            latitude: -23.551520,
            longitude: -46.634308,
            ip: '192.168.0.2',
            status: 'inativo',
            usuario_id: 2
        }
    ];

    const filtroValido = { status: 'ativo' };
    const filtroInvalido = { latitude: 'inválido' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Deve listar estações com base no filtro válido.', async () => {
        EstacaoRepository.findMany.mockResolvedValue(estacoesMock);

        const resultado = await EstacaoService.listar(filtroValido);

        expect(EstacaoRepository.findMany).toHaveBeenCalledWith(filtroValido);
        expect(resultado).toEqual(estacoesMock);
    });

    it('Deve lançar erro se nenhum resultado for encontrado.', async () => {
        EstacaoRepository.findMany.mockResolvedValue([]);

        await expect(EstacaoService.listar(filtroValido))
            .rejects
            .toEqual({
                error: true,
                code: 400,
                message: "Nenhuma estação encontrada.",
            });

        expect(EstacaoRepository.findMany).toHaveBeenCalledWith(filtroValido);
    });

    it('Deve lançar erro de validação para filtros inválidos.', async () => {
        await expect(EstacaoService.listar(filtroInvalido))
            .rejects
            .toEqual(expect.objectContaining({
                error: true,
                code: 400,
            }));

        expect(EstacaoRepository.findMany).not.toHaveBeenCalled();
    });

    it('Deve lidar com outros erros e lançar erro', async () => {
        EstacaoRepository.findMany.mockRejectedValue(new Error('Erro desconhecido'));

        await expect(EstacaoService.listar(filtroValido))
            .rejects
            .toThrow('Erro desconhecido');

        expect(EstacaoRepository.findMany).toHaveBeenCalledWith(filtroValido);
    });
});

describe('EstacaoService.inserir', () => {
    const estacaoValida = {
        nome: 'Estação Teste',
        endereco: 'Rua Teste, 123',
        latitude: -23.550520,
        longitude: -46.633308,
        ip: '192.168.0.1',
        status: 'ativo',
        usuario_id: 1
    };

    const usuarioValido = { id: 1, nome: 'Usuário Teste' };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Deve inserir uma estação com dados válidos.', async () => {
        UsuarioRepository.findById.mockResolvedValue(usuarioValido);
        EstacaoRepository.create.mockResolvedValue(estacaoValida);

        const resultado = await EstacaoService.inserir(estacaoValida);

        expect(UsuarioRepository.findById).toHaveBeenCalledWith(estacaoValida.usuario_id);
        expect(EstacaoRepository.create).toHaveBeenCalledWith(estacaoValida);
        expect(resultado).toEqual(estacaoValida);
    });

    it('Deve lançar erro se o usuário não for encontrado.', async () => {
        UsuarioRepository.findById.mockResolvedValue(null);

        await expect(EstacaoService.inserir(estacaoValida))
            .rejects
            .toEqual({
                error: true,
                code: 400,
                message: "Usuário não encontrado.",
            });

        expect(UsuarioRepository.findById).toHaveBeenCalledWith(estacaoValida.usuario_id);
        expect(EstacaoRepository.create).not.toHaveBeenCalled();
    });

    it('Deve lançar erro de validação para dados inválidos.', async () => {
        const dadosInvalidos = {
            nome: 'Estação Teste',
            endereco: 'Rua Teste, 123',
            latitude: 'inválido',  // Valor inválido
            longitude: -46.633308,
            ip: '192.168.0.1',
            status: 'ativo',
            usuario_id: 1
        };

        await expect(EstacaoService.inserir(dadosInvalidos))
            .rejects
            .toEqual(expect.objectContaining({
                error: true,
                code: 400,
            }));

        expect(UsuarioRepository.findById).not.toHaveBeenCalled();
        expect(EstacaoRepository.create).not.toHaveBeenCalled();
    });

    it('Deve lançar erro ao tentar inserir uma estação e falhar.', async () => {
        UsuarioRepository.findById.mockResolvedValue(usuarioValido);
        EstacaoRepository.create.mockResolvedValue(null);

        await expect(EstacaoService.inserir(estacaoValida))
            .rejects
            .toEqual({
                error: true,
                code: 400,
                message: "Erro ao cadastrar estação.",
            });

        expect(UsuarioRepository.findById).toHaveBeenCalledWith(estacaoValida.usuario_id);
        expect(EstacaoRepository.create).toHaveBeenCalledWith(estacaoValida);
    });
});

describe('EstacaoService.atualizar', () => {
    const mockEstacao = {
        id: 1,
        nome: 'Estação Teste',
        endereco: 'Rua Teste, 123',
        latitude: -23.550520,
        longitude: -46.633308,
        ip: '192.168.0.1',
        status: 'ativo',
        usuario_id: 1
    };

    const idValido = 1;
    const dadosAtualizados = {
        nome: 'Novo Nome',
        latitude: -23.555555,
        longitude: -46.666666
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('Deve atualizar uma estação com sucesso.', async () => {
        EstacaoRepository.findById.mockResolvedValue(mockEstacao);
        EstacaoRepository.update.mockResolvedValue({
            ...mockEstacao,
            ...dadosAtualizados
        });

        const resultado = await EstacaoService.atualizar({ id: idValido }, dadosAtualizados);

        expect(EstacaoRepository.findById).toHaveBeenCalledWith(idValido);
        expect(EstacaoRepository.update).toHaveBeenCalledWith(idValido, expect.objectContaining(dadosAtualizados));
        expect(resultado).toEqual(expect.objectContaining(dadosAtualizados));
    });

    it('Deve lançar erro se a estação não for encontrada.', async () => {
        EstacaoRepository.findById.mockResolvedValue(null);

        await expect(EstacaoService.atualizar({ id: idValido }, dadosAtualizados))
            .rejects
            .toEqual({
                error: true,
                code: 400,
                message: "Estação não encontrado.",
            });

        expect(EstacaoRepository.findById).toHaveBeenCalledWith(idValido);
        expect(EstacaoRepository.update).not.toHaveBeenCalled();
    });

    it('Deve lançar erro de validação para dados inválidos.', async () => {
        const dadosInvalidos = {
            latitude: 'invalido',
        };

        await expect(EstacaoService.atualizar(idValido, dadosInvalidos))
            .rejects
            .toEqual(expect.objectContaining({
                error: true,
                code: 400,
            }));

        expect(EstacaoRepository.findById).not.toHaveBeenCalled();
        expect(EstacaoRepository.update).not.toHaveBeenCalled();
    });

    it('Deve lançar erro ao não conseguir atualizar a estação.', async () => {
        EstacaoRepository.findById.mockResolvedValue(mockEstacao);
        EstacaoRepository.update.mockResolvedValue(null);

        await expect(EstacaoService.atualizar({ id: idValido }, dadosAtualizados))
            .rejects
            .toEqual({
                error: true,
                code: 400,
                message: "Não foi possível atualizar estação.",
            });

        expect(EstacaoRepository.findById).toHaveBeenCalledWith(idValido);
        expect(EstacaoRepository.update).toHaveBeenCalledWith(idValido, expect.objectContaining(dadosAtualizados));
    });
});