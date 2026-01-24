import { Router } from "express";
import { healthCheck } from "../controllers";
import { listarBairros } from "../controllers";
import clienteRoutes from "./cliente.routes";
import fornecedorRoutes from "./fornecedor.routes";
import vinculoRoutes from "./vinculo.routes";

export const router = Router();

// Healthcheck da API
router.get("/healthcheck", healthCheck);

// Bairros
router.get("/bairros", listarBairros);

router.use('/clientes', clienteRoutes);
router.use('/fornecedores', fornecedorRoutes); 
router.use('/vinculos', vinculoRoutes); 

export default router;