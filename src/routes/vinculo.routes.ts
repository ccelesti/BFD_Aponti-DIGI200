import { Router } from 'express';
import * as vinculo from '../controllers/vinculo.controller';

const router = Router();


// Vínculos Cliente - Fornecedor
router.post('/', vinculo.criarVinculoClienteFornecedor);
router.put('/', vinculo.reativarVinculoClienteFornecedor);
router.delete('/', vinculo.cancelarVinculoClienteFornecedor);

export default router;