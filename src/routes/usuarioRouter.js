import express from "express";
import autenticacaoUser from '../middleware/authenticationUser.js';
import Usuario from "../controllers/usuarioController.js";

const router = express.Router()

router.post('/usuarios', autenticacaoUser, Usuario.cadastrar);
router.patch('/usuarios/:id', autenticacaoUser, Usuario.atualizar);
router.delete('/usuarios/:id', autenticacaoUser, Usuario.deletar);
router.get('/usuarios', Usuario.listar);
router.get('/usuarios/:id', Usuario.listarPorId);

export default router;