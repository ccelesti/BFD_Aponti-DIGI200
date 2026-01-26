import { Router } from "express";
import * as controleDoSensor from '../controllers/sensor.controllers';

const router = Router();

router.post("/sensores",controleDoSensor.cadastroNovoSensor //
);

router.post("/sensores/:id_sensor/leituras",controleDoSensor.receberLeituraNivelSensor
);

router.put("/sensores/:id_sensor/reset",controleDoSensor.reinicializarSensor //
);

router.get("/clientes/:id_cliente/sensores/:id_sensor/status",controleDoSensor.verficarEstadoCliente //
);

router.put("/clientes/:id_cliente/sensores/:id_sensor/status",controleDoSensor.renovarStatusSensor //
);

export default router;