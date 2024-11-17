import commonResponses from "../../schemas/commonResponses.js";

const usuarioListar = {
  "/usuarios": {
    get: {
      tags: ["Usuario"],
      summary: "Lista todos os usuários cadastrados",
      parameters: [
        {
          name: "pagina",
          in: "query",
          description: "pagina da listagem",
          required: false,
          schema: {
            type: "number",
            format: "int",
          }
        },
        {
          name: "quantidade",
          in: "query",
          description: "quantidade por pagina",
          required: false,
          schema: {
            type: "number",
            format: "int",
          },
        },
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
      ],
      responses: {
        200: commonResponses['200']("#/components/schemas/usuario_listar_200"),
        400: commonResponses['400'](null,'Erro ao listar usuarios',"#/components/schemas/usuario_listar_400"),
        500: commonResponses['500']()
      },
    },
  },
};

export default usuarioListar;
