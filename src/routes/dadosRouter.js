import express from 'express';
import Dados from '../controllers/dadosController.js';

const router = express.Router();
router.get('/dados', Dados.listar);
router.post('/dados', Dados.inserir);

export default router;