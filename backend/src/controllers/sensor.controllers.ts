import { Request, Response } from "express";
import { pool } from "../database/db";
import axios from "axios";
import * as serviceSensor from "../services/sensor.services";

const NODE_RED_BASE = process.env.NODE_RED_URL || "http://localhost:1880";

/**
 * Extrai informação de erro de forma segura e tipada.
 */
function extractErrorInfo(err: unknown): { message: string; data?: any } {
  if (axios.isAxiosError(err)) {
    return { message: err.message, data: err.response?.data };
  }
  if (err instanceof Error) {
    return { message: err.message };
  }
  return { message: String(err) };
}

/**
 * Cadastra um novo sensor no banco de dados e inicia o monitoramento no Node-RED.
 * Em caso de falha na notificação com o Node-RED, o erro é registrado para tentativa posterior.
 * @route POST /sensores
 * @param {number} req.body.id_sensor - ID do sensor.
 * @param {number} req.body.id_cliente - ID do cliente proprietário.
 * @param {string} req.body.tipo_gas - Tipo do botijão (ex: "P13", "P45").
 */
export async function cadastroNovoSensor(req: Request, res: Response) {
  try {
    const { id_sensor, id_cliente, tipo_gas } = req.body;
    const data_ultima_troca = new Date();

    if (!id_sensor || !id_cliente || !tipo_gas) {
      return res.status(400).json({ error: "Campos 'id_sensor', 'id_cliente' e 'tipo_gas' são obrigatórios" });
    }

    const verificar_cliente = await pool.query("SELECT id_cliente FROM Cliente WHERE id_cliente = $1", [id_cliente]);
    if (verificar_cliente.rowCount === 0) {
      return res.status(400).json({ error: "Id de cliente não encontrado ou incorreto" });
    }
    if (!serviceSensor.verificarTipoGas(tipo_gas)) {
      return res.status(400).json({ error: "Tipo de gás inválido" });
    }

    const query =
      "INSERT INTO Sensor (id_sensor, id_cliente, tipo_gas, data_ultima_troca) VALUES ($1, $2, $3, $4) RETURNING *";
    const novo_sensor = await pool.query(query, [id_sensor, id_cliente, tipo_gas, data_ultima_troca]);

    if (novo_sensor.rowCount === 0) {
      throw new Error("Algumas das informações estão incorretas");
    }

    const gas_peso_max = await serviceSensor.pesoMaxBotijaoGas(tipo_gas);
    const url_sensor_nodered = `${NODE_RED_BASE}/iniciar-monitoramento`;
    const payload = {
      message: "ATIVAR_SENSOR",
      id_sensor,
      id_cliente,
      pesoFluido: gas_peso_max.pesoMaxFluido,
      pesoBruto: gas_peso_max.pesoBruto,
      pesoTara: gas_peso_max.pesoTara,
    };

    try {
      await axios.post(url_sensor_nodered, payload, { timeout: 5000 });
    } catch (notifyErr: unknown) {
      const info = extractErrorInfo(notifyErr);
      console.error("Falha ao notificar Node-RED (iniciar-monitoramento): ", info.data ?? info.message);

      
      try {
        await pool.query(
          `INSERT INTO notification_failures (url, payload, attempts, last_error, next_try_at)
           VALUES ($1, $2::jsonb, $3, $4, $5)`,
          [url_sensor_nodered, JSON.stringify(payload), 0, info.message, new Date(Date.now() + 60 * 1000)]
        );
      } catch (dbErr) {
        console.error("Falha ao gravar notification_failures: ", dbErr);
      }
    }
    

    return res.status(201).json({
      message: "Sensor cadastrado!",
      id_sensor,
      id_cliente,
      pesoFluido: gas_peso_max.pesoMaxFluido,
      peso_bruto: gas_peso_max.pesoBruto,
      peso_tara: gas_peso_max.pesoTara,
    });
  } catch (err: unknown) {
    const info = extractErrorInfo(err);
    console.error("ERRO cadastroNovoSensor:", info.data ?? info.message);
    return res.status(500).json({ error: "Falha ao inicializar o sensor", details: info.message });
  }
}

/**
 * Recebe uma leitura de peso do sensor e calcula o percentual de gás restante.
 * Aplica heurística para distinguir peso bruto de peso líquido e gera previsão de consumo.
 * @route POST /sensores/:id/leituras
 * @param {string} req.params.id - ID do sensor.
 * @param {number} req.body.peso_atual - Peso lido pela balança (em gramas).
 */
export async function receberLeituraNivelSensor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { peso_atual } = req.body;

    if (!id || peso_atual === undefined) {
      return res.status(400).json({ error: "Payload inválido" });
    }

    const sensorInfo = await pool.query(
      "SELECT tipo_gas, data_ultima_troca FROM Sensor WHERE id_sensor = $1",
      [id]
    );
    if (sensorInfo.rowCount === 0) {
      return res.status(404).json({ error: "Sensor não encontrado" });
    }

    const { tipo_gas, data_ultima_troca } = sensorInfo.rows[0];
    const pesos = await serviceSensor.pesoMaxBotijaoGas(tipo_gas);

    // Normalizar entrada
    const incoming = Number(peso_atual);
    if (Number.isNaN(incoming)) {
      return res.status(400).json({ error: "Peso atual inválido" });
    }

    // Heurística: se incoming <= tara, assumimos que veio apenas o peso do fluido
    let peso_bruto: number;
    let peso_fluido: number;
    if (incoming <= Number(pesos.pesoTara)) {
      peso_fluido = incoming;
      peso_bruto = peso_fluido + Number(pesos.pesoTara);
    } else {
      peso_bruto = incoming;
      peso_fluido = peso_bruto - Number(pesos.pesoTara);
    }

    if (peso_fluido < 0) peso_fluido = 0;
    if (peso_fluido > Number(pesos.pesoMaxFluido)) peso_fluido = Number(pesos.pesoMaxFluido);

    // Usar peso_fluido para previsão
    const dias_restantes = await serviceSensor.calcularPrevisaoPorNivel(
      peso_fluido,
      data_ultima_troca,
      tipo_gas
    );

    const nivel_percent = await serviceSensor.porcentagemPesoGas(tipo_gas, peso_fluido);
    const nivel_serial = Math.max(0, Math.min(100, Math.round(nivel_percent)));

    await pool.query("INSERT INTO Leitura_Sensor (id_sensor, nivel_atual) VALUES ($1, $2)", [
      id,
      nivel_serial,
    ]);

    return res.json({
      success: true,
      peso_atual: incoming,
      peso_bruto,
      peso_fluido,
      nivel_percent: nivel_serial,
      previsao_dias: dias_restantes,
    });
  } catch (err: unknown) {
    const info = extractErrorInfo(err);
    console.error("Erro ao receber a leitura de peso do sensor:", info.data ?? info.message);
    return res.status(500).json({ error: "Erro ao processar leitura" });
  }
}


/**
 * Reinicializa o ciclo de vida de um sensor (troca do botijão).
 * Atualiza a data de troca, define status como ativo e reseta parâmetros no Node-RED.
 * @route PUT /sensores/:id/reset
 * @param {string} req.params.id - ID do sensor.
 */
export async function reinicializarSensor(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "O id do sensor solicitado não foi identificado" });

    const renovarRes = await pool.query(
      `UPDATE Sensor
       SET data_ultima_troca = NOW(), status_uso = true
       WHERE id_sensor = $1
       RETURNING *`,
      [id]
    );

    if (renovarRes.rowCount === 0) {
      return res.status(404).json({ error: "Sensor não encontrado: não foi possível reiniciar" });
    }

    const sensor = renovarRes.rows[0];
    const tipo_gas = sensor.tipo_gas;

    const configPesos = await serviceSensor.pesoMaxBotijaoGas(tipo_gas);
    const { pesoTara, pesoMaxFluido, pesoBruto } = configPesos;

    const previsao_inicial = await serviceSensor.calcularPrevisaoPorNivel(pesoMaxFluido, new Date(), tipo_gas);

    try {
      await pool.query("INSERT INTO Leitura_Sensor (id_sensor, nivel_atual) VALUES ($1, $2)", [id, 100]);
    } catch (dbErr) {
      console.error(`Erro ao inserir Leitura_Sensor para id_sensor=${id}:`, dbErr);
      // não aborta a reinicialização
    }

    const node_red_url = `${NODE_RED_BASE}/sensor/reset`;
    const payload = {
      message: "Botijão renovado com sucesso!",
      id,
      pesoBruto,
      pesoTara,
      pesoFluido: pesoMaxFluido,
    };

    try {
      await axios.post(node_red_url, payload, { timeout: 5000 });
    } catch (nrErr: unknown) {
      const info = extractErrorInfo(nrErr);
      console.error(`Falha ao notificar Node-RED (${node_red_url}) para id_sensor=${id}:`, info.data ?? info.message);
      
      try {
        await pool.query(
          `INSERT INTO notification_failures (url, payload, attempts, last_error, next_try_at)
           VALUES ($1, $2::jsonb, $3, $4, $5)`,
          [node_red_url, JSON.stringify(payload), 0, info.message, new Date(Date.now() + 60 * 1000)]
        );
      } catch (dbErr) {
        console.error("Falha ao gravar notification_failures: ", dbErr);
      }
    }

    return res.status(200).json({
      message: "Botijão renovado com sucesso!",
      id_sensor: Number(id),
      pesoBruto,
      pesoFluido: pesoMaxFluido,
      previsao_dias: previsao_inicial,
    });
  } catch (err: unknown) {
    const info = extractErrorInfo(err);
    console.error("Erro ao reinicializar o sensor: ", info.data ?? info.message);
    return res.status(500).json({ error: "Falha ao renovar o ciclo do sensor", details: info.message });
  }
}

/**
 * Verifica o estado atual de uso do sensor (ex: "Renovado", "Em uso" ou "Em espera").
 * @route GET /sensores/:id/clientes/:id_cliente/status
 * @param {string} req.params.id - ID do sensor.
 * @param {string} req.params.id_cliente - ID do cliente.
 */
export async function verificarEstadoCliente(req: Request, res: Response) {
  try {
    const { id, id_cliente } = req.params;

    const cliente_info = await pool.query(
      "SELECT status_uso FROM Sensor WHERE id_sensor = $1 AND id_cliente = $2",
      [id, id_cliente]
    );
    if (cliente_info.rowCount === 0) {
      return res.status(404).json({ error: "Cliente não encontrado!" });
    }

    const status_uso = cliente_info.rows[0].status_uso;
    const status = status_uso ? "Renovado" : "Em espera";

    return res.status(200).json({ status });
  } catch (err: unknown) {
    const info = extractErrorInfo(err);
    console.error("Erro ao verificar estado: ", info.data ?? info.message);
    return res.status(500).json({ error: "Erro interno ao verificar estado" });
  }
}

/**
 * Altera o status de uso do sensor (Ex: alterar de "Em espera" para "Renovado").
 * @route PUT /sensores/:id/clientes/:id_cliente/status
 * @param {string} req.params.id - ID do sensor.
 * @param {string} req.params.id_cliente - ID do cliente.
 * @param {boolean} req.body.status_uso - Novo status de uso.
 */
export async function renovarStatusSensor(req: Request, res: Response) {
  try {
    const { id, id_cliente } = req.params;
    const { status_uso } = req.body;

    if (typeof status_uso !== "boolean") {
      return res.status(400).json({ error: "O campo 'status_uso' é obrigatório e deve ser booleano" });
    }

    const result = await pool.query(
      `UPDATE Sensor
       SET status_uso = $1
       WHERE id_cliente = $2 AND id_sensor = $3
       RETURNING id_sensor, id_cliente, tipo_gas, status_uso, data_ultima_troca`,
      [status_uso, id, id_cliente]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Sensor não encontrado para esse cliente!" });
    }

    // Notificar Node-RED (não deve falhar a resposta final)
    try {
      const nodeRedUrl = `${NODE_RED_BASE}/sensor/status-change`;
      await axios.post(
        nodeRedUrl,
        {
          id,
          id_cliente,
          status_uso,
        },
        { timeout: 5000 }
      );
    } catch (nrErr: unknown) {
      const info = extractErrorInfo(nrErr);
      console.error("Falha ao notificar Node-RED sobre alteração de status: ", info.data ?? info.message);
      // opcional: registrar em notification_failures
      try {
        await pool.query(
          `INSERT INTO notification_failures (url, payload, attempts, last_error, next_try_at)
           VALUES ($1, $2::jsonb, $3, $4, $5)`,
          [`${NODE_RED_BASE}/sensor/status-change`, JSON.stringify({ id, id_cliente, status_uso }), 0, info.message, new Date(Date.now() + 60 * 1000)]
        );
      } catch (dbErr) {
        console.error("Falha ao gravar notification_failures: ", dbErr);
      }
    }

    return res.status(200).json({
      message: "Status do sensor atualizado com sucesso!",
      sensor: result.rows[0],
    });
  } catch (err: unknown) {
    const info = extractErrorInfo(err);
    console.error("Erro ao renovar o status do sensor: ", info.data ?? info.message);
    return res.status(500).json({ error: "Erro ao atualizar o status do sensor", details: info.message });
  }
}