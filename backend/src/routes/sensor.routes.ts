import { Router } from "express";
import * as controleDoSensor from '../controllers/sensor.controllers';

const router = Router();

// Gestão e Operação do Sensor
router.post("/",controleDoSensor.cadastroNovoSensor);
router.post("/:id/leituras",controleDoSensor.receberLeituraNivelSensor);
router.put("/:id/reset",controleDoSensor.reinicializarSensor);

// Status e Vínculo com o Cliente
router.get("/:id/clientes/:id_cliente/status",controleDoSensor.verificarEstadoCliente);
router.put("/:id/clientes/:id_cliente/status",controleDoSensor.renovarStatusSensor);

export default router;