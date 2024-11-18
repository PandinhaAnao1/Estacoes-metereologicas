
const listarSchemas = {
  usuario_listar_200: {
    type: "object",
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

  usuario_listar_400: {
    
    type:'array',
    example:[

      {
        message: "Formato de email inválido",
        path: "email"
    },
    {
        message: "Nome é obrigatório",
        path: "nome"
    },
    {
        message: "A senha deve ter pelo menos 6 caracteres",
        path: "senha"
    }
    ]
  },
};

export default listarSchemas;
