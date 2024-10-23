const listarSchemas = {
  usuario_listar_200: {
    type: "object",
    properties: {
      data: {
        type: "array",
        example: [
          {
            id: 1,
            nome: "Vitor Gabriel",
            email: "vitorgabriel123@gmail.com",
          },
          {
            id: 2,
            nome: "Ana Pereira",
            email: "ana@example.com",
          },
          {
            id: 3,
            nome: "Vitor Hag",
            email: "5vitorgabrielvha3@gmail.com",
          },
          {
            id: 4,
            nome: "Maria Oliveira",
            email: "maria@example.com",
          },
        ],
      },
      error: {
        type: "boolean",
        example: false,
      },
      code: {
        type: "int",
        example: 200,
      },
      message: {
        type: "string",
        example: "Usuários encontrado com sucesso",
      },
    },
  },

  usuario_listar_404: {
    type: "object",

    properties: {
      data: {
        type: "object",
        example: {
          error: {
            type: "boolean",
            example: true,
          },
          code: {
            type: "int",
            example: 404,
          },
          message: {
            type: "array",
            example: ["Nenhum usuário encontrado"],
          },
        },
      },
    },
  },

  usuario_listar_400: {
    properties: {
      data: {
        type: "object",
        items: {},
        example: {
          error: {
            type: "boolean",
            example: true,
          },
          code: {
            type: "int",
            example: 400,
          },
          errors: {
            type: "array",
            example: [
              "ID informado não é do tipo number",
              "ID informado não é um número inteiro",
              "ID informado não é positivo",
              "Nome informado não é do tipo string",
              "O Email tem que ser String",
              "Email invalido!",
            ],
          },
        },
      },
    },
  },
};

export default listarSchemas;
