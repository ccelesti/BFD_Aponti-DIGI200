import { Router } from "express";
import { healthCheck } from "../controllers";
import * as cliente from "../controllers/index";
import * as fornecedor from "../controllers/fornecedor";
import { listarBairros } from "../controllers";
import * as bairroFornecedor from "../controllers/bairro_fornecedor";
export const router = Router();

// Healthcheck da API
router.get("/healthcheck", healthCheck);

// Clientes
router.post("/clientes", cliente.adicionarClientes);
router.get("/clientes", cliente.listarClientes);
router.get("/clientes/:id", cliente.listarCliente);
router.put("/clientes/:id", cliente.editarCliente);
router.delete("/clientes/:id", cliente.excluirCliente);

// POST /clientes/:id/endereco
router.post("/clientes/:id/endereco", cliente.adicionarEnderecoCliente);

// Bairros Atendidos pelos Fornecedores
router.post("/fornecedores/:id/areas", bairroFornecedor.adicionarBairrosAtendidos);
router.get("/fornecedores/areas", bairroFornecedor.listarBairrosAtendidos);
router.get("/fornecedores/:id/areas-atendidas", bairroFornecedor.listarBairroAtendido);
router.put("/fornecedores/:id/areas/:id_bairro", bairroFornecedor.editarBairroFornecido);
router.delete("/fornecedores/:id/areas/:id_bairro", bairroFornecedor.excluirBairroAtendido);

// Endereços de clientes
router.post("/clientes/:id/enderecos", cliente.adicionarEnderecoCliente);
router.get("/clientes/:id/enderecos", cliente.visualizarEnderecoCliente);
router.get("/clientes/:id/enderecos-ativos", cliente.visualizarEnderecosAtivosCliente);
router.put("/clientes/:id/enderecos/:id_endereco", cliente.editarEnderecoCliente);
router.delete("/clientes/:id/enderecos/:id_endereco", cliente.excluirEnderecoCliente);

// Fornecedor
router.post("/fornecedores", fornecedor.adicionarFornecedor);
router.get("/fornecedores", fornecedor.listarFornecedores);
router.get("/fornecedores/:id", fornecedor.listarFornecedor);
router.put("/fornecedores/:id", fornecedor.editarFornecedor);
router.delete("/fornecedores/:id", fornecedor.excluirFornecedor);

// PUT /clientes/:id/privacidade
// Body: { permissao_contato_fornecedor: boolean }
router.put("/clientes/:id/privacidade", cliente.privacidadeCliente);

// PUT /clientes/:id/vale-gas
// Body: { vale_gas_ativo: boolean }
router.put("/clientes/:id/vale-gas", cliente.valeGasCliente);

// Bairros
router.get("/bairros", listarBairros);



export default router;