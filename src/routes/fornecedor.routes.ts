import { Router } from 'express';
import * as fornecedor from '../controllers/fornecedor.controller';
import * as bairroFornecedor from '../controllers/bairroFornecedor.controller';

const router = Router();

// Bairros Atendidos pelos Fornecedores
router.post("/:id/areas", bairroFornecedor.adicionarBairrosAtendidos);
router.get("/areas", bairroFornecedor.listarBairrosAtendidos);
router.get("/:id/areas-atendidas", bairroFornecedor.listarBairroAtendido);
router.put("/:id/areas/:id_bairro", bairroFornecedor.editarBairroFornecido);
router.delete("/:id/areas/:id_bairro", bairroFornecedor.excluirBairroAtendido);

// Fornecedor
router.post("/", fornecedor.adicionarFornecedor);
router.get("/", fornecedor.listarFornecedores);
router.get("/:id", fornecedor.listarFornecedor);
router.put("/:id", fornecedor.editarFornecedor);
router.delete("/:id", fornecedor.excluirFornecedor);

// Horário de funcionamento
router.post("/:id/horarios", fornecedor.adicionarHorarioFuncionamento);
router.put("/:id/horarios" , fornecedor.alterarHorarioFuncionamento);

export default router;