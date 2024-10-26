import { describe, expect, test } from "@jest/globals";
import usuarioService from "../../../services/usuarioService.js";
import usuarioRepository from "../../../repositories/usuarioRepository.js";
import { sendError } from "../../../util/messages.js";
import { z, ZodError } from "zod";

beforeEach(() => {
  usuarioRepository.findById = jest.fn();
});

jest.mock("../../../repositories/usuarioRepository.js", () => ({
  findMany: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  hash: jest
    .fn()
    .mockResolvedValue(
      "$2a$10$sAYH1jr9ohI8spU0ENZFXe1NJcJg/UQRbvYzHQT1jbBUIASrg00am"
    ),
}));

jest.mock("../../../util/messages.js")

describe("usuarioService.listar", () => {
  it("Deve retornar usuários válidos quando o filtro é correto", async () => {
    const usuarioMock = [
      { id: 1, nome: "John", email: "john@example.com", senha: "secret" },
    ];
    usuarioRepository.findMany.mockResolvedValue(usuarioMock);

    const filtro = { id: 1 };
    const result = await usuarioService.listar(filtro);

    expect(result).toEqual([
      { id: 1, nome: "John", email: "john@example.com" },
    ]); // senha excluída
  });

  it("Deve lançar erro se nenhum usuário for encontrado", async () => {
    usuarioRepository.findMany.mockResolvedValue([]);

    const filtro = { id: 999 };

    await expect(usuarioService.listar(filtro)).rejects.toEqual({
      error: true,
      code: 400,
      message: "Nenhum usuário encontrado.",
    });
  });
});

describe("usuarioService.listarId", () => {
  it("Deve retornar usuários válidos quando o filtro é correto", async () => {
    const usuarioMock = [
      { id: 1, nome: "John", email: "john@example.com", senha: "secret" },
    ];
    usuarioRepository.findById.mockResolvedValue(usuarioMock);

    const filtro = { id: 1 };
    const result = await usuarioService.listarPorID(filtro);

    expect(result).toEqual([
      { id: 1, nome: "John", email: "john@example.com", senha: "secret" },
    ]);
  });

  it("Deve retornar error no id", async () => {
    try {
      const usuarioMock = [
        { id: -1.5, nome: "John", email: "john@example.com", senha: "secret" },
      ];
      usuarioRepository.findById.mockResolvedValue(usuarioMock);

      const filtro = { id: -1.5 };

      await usuarioService.listarPorID(filtro);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          path: err.path[0],
          message: err.message,
        }));

        expect(errorMessages).toEqual([
          { path: "id", message: "Id informado não é um número inteiro." },
          { path: "id", message: "Id informado não é positivo." },
        ]);
      } else {
        throw error;
      }
    }
  });

  it("Deve retonar error no id = abc", async () => {
    try {
      const usuarioMock = [
        { id: "abc", nome: "John", email: "john@example.com", senha: "secret" },
      ];
      usuarioRepository.findById.mockResolvedValue(usuarioMock);

      const filtro = { id: "abc" };

      await usuarioService.listarPorID(filtro);
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((err) => ({
          path: err.path[0],
          message: err.message,
        }));

        expect(errorMessages).toEqual([
          { path: "id", message: "Id informado não é do tipo number." },
        ]);
      } else {
        throw error;
      }
    }
  });
});

describe("usuarioService.inserir", () => {
  it("Deve inserir um usuário válido", async () => {
    const data = {
      nome: "John",
      email: "john@example.com",
      senha: "StrongPass1!",
    };
    const mockUsuario = { id: 1, nome: "John", email: "john@example.com" };
    usuarioRepository.findMany.mockResolvedValue([]); // Email não repetido
    usuarioRepository.create.mockResolvedValue(mockUsuario);

    const result = await usuarioService.inserir(data);

    expect(result).toEqual(mockUsuario);
  });

  it("Deve lançar erro se o email já estiver cadastrado", async () => {
    const data = {
      nome: "John",
      email: "john@example.com",
      senha: "StrongPass1!",
    };
    usuarioRepository.findMany.mockResolvedValue([data]); // Email repetido

    await expect(usuarioService.inserir(data)).rejects.toEqual({
      code: 400,
      errors: [
        {
          message: "Email já cadastrado!",
          path: "email",
        },
      ],
    });
  });
});

describe("usuarioService.atualizar", () => {
  // Teste de caminho feliz (sucesso)
  it("Deve atualizar o usuário com sucesso", async () => {
    const idMock = { id: 1 };
    const dadosMock = {
      nome: "Novo Nome",
      email: "novoemail@example.com",
      senha: "SenhaValida123!",
    };

    const usuarioExistenteMock = {
      id: idMock,
      nome: "Nome Antigo",
      email: "emailantigo@example.com",
      senha: "SenhaAntigaHashed123@",
    };

    const senhaHashedMock = "SenhaAntigaHashed123";
    const emailRepetidoMock = []; // Simulando que não há email repetido.

    // Mock do repositório e da função de hash
    usuarioRepository.findById.mockResolvedValue(usuarioExistenteMock);
    usuarioRepository.findMany.mockResolvedValue(emailRepetidoMock);

    usuarioRepository.update.mockResolvedValue({
      ...usuarioExistenteMock,
      nome: dadosMock.nome,
      email: dadosMock.email,
      senha: senhaHashedMock,
    });

    const resultado = await usuarioService.atualizar(idMock, dadosMock);

    expect(resultado).toEqual({
      id: idMock,
      nome: dadosMock.nome,
      email: dadosMock.email,
    });
  });

  // Teste para ID não encontrado no repositório
  it("Deve lançar erro quando o usuário não for encontrado", async () => {
    const idMock = { id: 1 };
    const dadosMock = {
      nome: "Nome Teste",
      email: "email@example.com",
      senha: "Senha123!",
    };

    usuarioRepository.findById.mockResolvedValue(null); // Simular usuário não encontrado

    await expect(usuarioService.atualizar(idMock, dadosMock)).rejects.toEqual({
      error: true,
      code: 400,
      message: "Usuário não encontrado.",
    });
  });


  it("Deve lançar erro de email já cadastrado ao tentar atualizar usuário", async () => {
    const idMock = {id: 1}
    const data = {
        email: "fernanda@example.com",
    };

      usuarioRepository.findById.mockResolvedValue(idMock);

      usuarioRepository.findMany.mockResolvedValue([data]); // Email repetido
  
      await expect(usuarioService.atualizar(idMock, data)).rejects.toEqual({
        code: 400,
        errors: [
          {
            message: "Email já cadastrado!",
            path: "email",
          },
        ],
      });
    });
});
