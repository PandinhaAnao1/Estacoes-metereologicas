import commonResponses from "../../schemas/commonResponses.js";

const usuarioDeletar = {

  //Delete
  "/usuarios/{id}": {
    delete: {
      tags: ["Usuario"],
      summary: "Detela um usuário pelo id",
      parameters: [
        {
          name: "id",
          in: "path",
          description: "ID do usuário",
          required: true,
          schema: {
            type: "integer",
            example: 9
          }
        }
      ],
      responses: {
        204: commonResponses["200"](null,'Usuario deletado com sucesso'),
        400: commonResponses["400"](null,null,"#/components/schemas/deltar_400"),
        500: commonResponses["500"](),
      }
    }
  }
};

export default usuarioDeletar;