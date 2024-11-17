const ListarPorIDSchemas = {
  usuario_listar_ID_200: {
    type: "object",
    example:
    {
      id: 1,
      nome: "usuario Atualizado",
      email: "vitorgabriel123@gmail.com"
    }


  },
  usuario_listar_ID_400: {
    type:'array',
    example:[
      {
        message: "O formato do id é inválido",
        path: "id"
      },
    ]
  },
}

export default ListarPorIDSchemas;