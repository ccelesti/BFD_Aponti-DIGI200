import { Router } from "express";
import { healthCheck } from "../controllers";
import { listarClientes } from "../controllers";

export const router = Router();

// Healthcheck da API
router.get("/healthcheck", healthCheck);

// Clientes
router.get("/clientes", listarClientes);

export default router;