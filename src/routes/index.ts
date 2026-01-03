import { Router } from "express";
import { healthCheck } from "../controllers";
import * as cliente from "../controllers/index";

export const router = Router();

// Healthcheck da API
router.get("/healthcheck", healthCheck);

// Clientes
router.post("/clientes", cliente.adicionarClientes);
router.get("/clientes", cliente.listarClientes);
router.get("/clientes/:id", cliente.listarCliente);
router.put("/clientes/:id", cliente.editarCliente);
router.delete("/clientes/:id", cliente.excluirCliente);

export default router;