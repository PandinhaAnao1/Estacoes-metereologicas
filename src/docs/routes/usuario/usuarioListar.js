const usuarioListar = {
  //get
  "/usuarios": {
    get: {
      tags: ["Usuario"],
      summary: "Lista todos os usuários cadastrados",
      parameters: [
        {
          name: "email",
          in: "query",
          description: "Email do usuário",
          required: false,
          schema: {
            type: "string",
            example: "",
          },
        },
        {
          name: "nome",
          in: "query",
          description: "Nome do usuário",
          required: false,
          schema: {
            type: "string",
            example: "",
          },
        },
        {
          name: "id",
          in: "query",
          description: "ID do usuário",
          required: false,
          schema: {
            type: "string",
            example: "",
          },
        },
      ],
      responses: {
        200: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/usuario_listar_200",
              },
            },
          },
        },

        404: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/usuario_listar_404",
              },
            },
          },
        },
        400: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/usuario_listar_400",
              },
            },
          },
        },
      },
    },
  },
};

export default usuarioListar;
