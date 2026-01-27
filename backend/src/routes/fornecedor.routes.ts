import { Router } from 'express';
import * as fornecedor from '../controllers/fornecedor.controller';
import * as bairroFornecedor from '../controllers/bairroFornecedor.controller';

const router = Router();

// Áreas de atendimento do fornecedor (bairros)
router.get("/areas", bairroFornecedor.listarBairrosAtendidos);

// Fornecedores
router.get("/", fornecedor.listarFornecedores);
router.post("/", fornecedor.adicionarFornecedor);
router.get("/:id", fornecedor.listarFornecedor);
router.put("/:id", fornecedor.editarFornecedor);
router.delete("/:id", fornecedor.excluirFornecedor);

// Áreas de atendimento do fornecedor (bairros)
router.post("/:id/areas", bairroFornecedor.adicionarBairrosAtendidos);
router.get("/:id/areas", bairroFornecedor.listarBairroAtendido);
router.put("/:id/areas/:id_bairro", bairroFornecedor.editarBairroFornecido);
router.delete("/:id/areas/:id_bairro", bairroFornecedor.excluirBairroAtendido);

// Horários de funcionamento do fornecedor
router.post("/:id/horarios", fornecedor.adicionarHorarioFuncionamento);
router.get("/:id/horarios", fornecedor.listarHorariosFuncionamento);
router.put("/:id/horarios", fornecedor.alterarHorarioFuncionamento);
router.delete("/:id/horarios/:dia", fornecedor.removerHorarioFuncionamento);

// Permissões do fornecedor
router.put("/:id/privacidade", fornecedor.privacidadeFornecedor);

// Clientes (visão do fornecedor)
router.get("/:id/clientes", fornecedor.listarClientesVinculadosFornecedor);

export default router;


