import { Router } from 'express';
import * as cliente from '../controllers/cliente.controller';

const router = Router();

// Clientes
router.post("/", cliente.adicionarClientes);
router.get("/", cliente.listarClientes);
router.get("/:id", cliente.listarCliente);
router.put("/:id", cliente.editarCliente);
router.delete("/:id", cliente.excluirCliente);

// Endereços do cliente
router.post("/:id/enderecos", cliente.adicionarEnderecoCliente);
router.get("/:id/enderecos", cliente.visualizarEnderecoCliente);
router.get("/:id/enderecos-ativos", cliente.visualizarEnderecosAtivosCliente);
router.put("/:id/enderecos/:id_endereco", cliente.editarEnderecoCliente);
router.delete("/:id/enderecos/:id_endereco", cliente.excluirEnderecoCliente);

// Permissões do cliente
router.put("/:id/privacidade", cliente.privacidadeCliente);
router.put("/:id/vale-gas", cliente.valeGasCliente);

// Fornecedores (visão do cliente)
router.get("/:id/fornecedores-recomendados", cliente.listarFornecedoresRecomendados);
router.get('/:id_cliente/fornecedores/:id_fornecedor/horarios', cliente.visualizarHorarioFuncionamentoFornecedor);

export default router;