import express from 'express';
import Autenticacao from '../controllers/autenticacaoController.js';

const router = express.Router();

router.post('/autenticacao', Autenticacao.login);

export default router;