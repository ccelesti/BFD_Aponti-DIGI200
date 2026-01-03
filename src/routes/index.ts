import { Router } from "express";
import * as cliente from "../controllers/index";
import * as fornecedor from "../controllers/fornecedor";
export const router = Router();

// Healthcheck da API
router.get("/healthcheck", cliente.healthCheck);

// Clientes
router.post("/clientes", cliente.adicionarClientes);
router.get("/clientes", cliente.listarClientes);
router.get("/clientes/:id", cliente.listarCliente);
router.put("/clientes/:id", cliente.editarCliente);
router.delete("/clientes/:id", cliente.excluirCliente);

// Fornecedor
router.post("/fornecedor", fornecedor.adicionarFornecedor);
router.get("/fornecedores", fornecedor.listarFornecedor);
router.get("/fornecedores/:id", fornecedor.listarFornecedores);
router.put("/fornecedores/:id", fornecedor.editarFornecedor);
router.delete("/fornecedores/:id", fornecedor.excluirFornecedor);


export default router;