import express from "express";
import autenticacaoUser from '../middleware/authenticationUser.js'
import Usuario from "../controllers/usuarioController.js";

const router = express.Router()

router.post('/usuarios', Usuario.cadastrar);
router.patch('/usuarios/:id', autenticacaoUser, Usuario.atualizar)
router.delete('/usuarios/:idUser', /*autenticacaoUser,*/ Usuario.deletar); // não mudar idUser pois da problema no swegger
router.get('/usuarios', Usuario.listar);
router.get('/usuarios/:id', Usuario.listarPorId);

export default router;
