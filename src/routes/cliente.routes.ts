import { Router } from 'express';
import * as cliente from '../controllers/cliente.controller';

const router = Router();

// Clientes
router.post("/", cliente.adicionarClientes);
router.get("/", cliente.listarClientes);
router.get("/:id", cliente.listarCliente);
router.put("/:id", cliente.editarCliente);
router.delete("/:id", cliente.excluirCliente);

// POST /clientes/:id/endereco
router.post("/clientes/:id/endereco", cliente.adicionarEnderecoCliente);

// Endereços de clientes
router.post("/:id/enderecos", cliente.adicionarEnderecoCliente);
router.get("/:id/enderecos", cliente.visualizarEnderecoCliente);
router.get("/:id/enderecos-ativos", cliente.visualizarEnderecosAtivosCliente);
router.put("/:id/enderecos/:id_endereco", cliente.editarEnderecoCliente);
router.delete("/:id/enderecos/:id_endereco", cliente.excluirEnderecoCliente);

// PUT /clientes/:id/privacidade
// Body: { permissao_contato_fornecedor: boolean }
router.put("/:id/privacidade", cliente.privacidadeCliente);

// PUT /clientes/:id/vale-gas
// Body: { vale_gas_ativo: boolean }
router.put("/:id/vale-gas", cliente.valeGasCliente);

export default router;
