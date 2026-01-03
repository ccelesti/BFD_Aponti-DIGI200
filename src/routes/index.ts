import { Router } from "express";
import { healthCheck } from "../controllers";
import { adicionarClientes, listarClientes, listarCliente, editarCliente, excluirCliente } from "../controllers";

export const router = Router();

// Healthcheck da API
router.get("/healthcheck", healthCheck);

// Clientes
router.post("/clientes", adicionarClientes);
router.get("/clientes", listarClientes);
router.get("/clientes/:id", listarCliente);
router.put("/clientes/:id", editarCliente);
router.delete("/clientes/:id", excluirCliente);

export default router;