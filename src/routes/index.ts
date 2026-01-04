import { Router } from "express";
import { healthCheck } from "../controllers";
import * as cliente from "../controllers/index";
import * as fornecedor from "../controllers/fornecedor";
import { listarBairros } from "../controllers";

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