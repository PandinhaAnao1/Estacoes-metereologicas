const ListarPorIDSchemas = {
    usuario_listar_ID_200:{
        type: "object",
        properties: {
          
            data: {
            type: "object", 
            items: {}, 
            example: {

              data: {
                type: 'array', example: [
                  {
                    "id": 1,
                    "nome": "usuario Atualizado",
                    "email": "vitorgabriel123@gmail.com"
                  }
                ]
              },
              error: { type: "boolean", example: false },
              code: { type: "int", example: 200 },
              message: { type: "string", example: "Usuário encontrado com sucesso" }
            }
          },
        }
      
    },

    usuario_listar_ID_404:{
        
        type: "object",
        properties: {
          data: {
            type: "object", items: {}, example:
            {
              error: { type: "boolean", example: true },
              code: { type: "int", example: 404 },
              message: { type: "array", example: ["ID invalido"] }
            }
          },
        }
      
    },

    usuario_listar_ID_400:{
        
        type: "object",
        properties: {
          data: {
            type: "object", items: {}, example:
            {
              error: { type: "boolean", example: true },
              code: { type: "int", example: 400 },
              message: { type: "array", example: ["Usuário não encontrado"] }
            }
          },
        }
    }
}