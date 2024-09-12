import express from 'express';
import Estacao from '../controllers/estacaoController.js';
import autenticacaoUser from '../middleware/authenticationUser.js';

const router = express.Router();
router.get('/estacoes', Estacao.listar);
router.get('/estacoes/:id', Estacao.listarPorId);
router.patch('/estacoes/:id', autenticacaoUser, Estacao.atualizar);
router.post('/estacoes', autenticacaoUser, Estacao.cadastrar);
//router.delete('/estacoes/:id', autenticacaoUser, Estacao.deletar);

export default router;
