import { Router } from "express";
import * as controleDoSensor from '../controllers/sensor.controllers';

const router = Router();

router.post("/cadastrarNovoSensor", controleDoSensor.cadastroNovoSensor);
router.post("/:id_sensor/leituraNivelSensor", controleDoSensor.receberLeituraNivelSensor);
router.put("/:id_sensor/reinicializarSensor", controleDoSensor.reinicializarSensor);
router.get("/cliente/:id_cliente/:id_sensor", controleDoSensor.verficarEstadoCliente);
router.put("/status/renovar/:id_cliente/:id_sensor", controleDoSensor.renovarStatusSensor);


export default router;
// O sensor manda uma requizição perguntando o estado do cliente. 
// O sistema vai retornar com: a condição do cliente (se ele renovoy o gás, se está em espera ou se ele cancelou.)
// Caso ele tenha renovado o sistema vai mandar o status renovado e também o id do cliente.