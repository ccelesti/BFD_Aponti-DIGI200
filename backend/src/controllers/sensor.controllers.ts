import { Request , Response }  from "express";
import { pool } from "../database/db";
import { SensorMedicaoGas, LeituraSensor } from "../models";
import axios from 'axios';
import * as serviceSensor from "../services/sensor.services"

//Essa função é onde recebemos os 
export async function receberLeituraNivelSensor(req: Request, res: Response) {
    try {
        const {id_sensor} = req.params
        const { peso_atual } = req.body;
        
        if (!id_sensor || peso_atual === undefined) {
            return res.status(400).json({ error: "Payload inválido" });
        }

        const sensorInfo = await pool.query(
            'SELECT tipo_gas, data_ultima_troca FROM Sensor WHERE id_sensor = $1',
            [id_sensor]
        );

        if (sensorInfo.rowCount === 0) {
            return res.status(404).json({ error: "Sensor não encontrado" });
        }

        const { tipo_gas, data_ultima_troca } = sensorInfo.rows[0];

        const pesos = await serviceSensor.pesoMaxBotijaoGas(tipo_gas);

        const peso_bruto = peso_atual;
        let peso_fluido = Number(peso_bruto) - Number(pesos.pesoTara);
        if (peso_fluido < 0) peso_fluido = 0;
        if (peso_fluido > pesos.pesoMaxFluido) peso_fluido = pesos.pesoMaxFluido;


        const dias_restantes = await serviceSensor.calcularPrevisaoPorNivel(
            peso_atual,
            data_ultima_troca,
            tipo_gas
        );

        const nivel_percent = await serviceSensor.porcentagemPesoGas(tipo_gas, peso_fluido);
        const nivel_serial = Math.max(0, Math.min(100, Math.round(nivel_percent)));

        await pool.query(
            `INSERT INTO Leitura_Sensor (id_sensor, nivel_atual) VALUES ($1, $2)`,
            [id_sensor, nivel_serial]
        );

        return res.json({
            success: true,
            peso_atual,
            peso_bruto,
            nivel_percent: nivel_serial,
            previsao_dias: dias_restantes
        });

    } catch (error) {
        return res.status(500).json({ error: "Erro ao processar leitura" });
    }
}


export async function cadastroNovoSensor ( req: Request, res: Response){
    try {
        //seria ideal eu ter aqui dentro também o id do endereço em especifico
        //para pegar o id do endereço seria bom colocar a função visualizarEnderecoCliente dentro de um arquivo dentro da pasta service 
        const { id_sensor, id_cliente , tipo_gas } = req.body;
        const data_ultima_troca = new Date ();

        const verificar_cliente = await pool.query ('SELECT id_cliente FROM Cliente WHERE id_cliente = $1', [id_cliente]);
        if (verificar_cliente.rowCount === 0){
            throw new Error ("Id de cliente não encontrado ou incorreto");
        }
        if (!serviceSensor.verificarTipoGas(tipo_gas)) {
        throw new Error("Tipo de gás inválido");
        }


        const query = 'INSERT INTO Sensor (id_sensor, id_cliente, tipo_gas, data_ultima_troca ) VALUES ($1, $2, $3, $4) RETURNING * ' 
        const novo_sensor = await pool.query (query , [id_sensor, id_cliente, tipo_gas,  data_ultima_troca ]);

        if (novo_sensor.rowCount === 0){
            throw new Error ("Algumas das informações está incorreta");
        }

        const url_sensor_nodered = 'http://bfd_nodered:1880/iniciar_monitoramento'; 

       const gas_peso_max = await serviceSensor.pesoMaxBotijaoGas( tipo_gas );
        
        await axios.post(url_sensor_nodered, {
            message: "ATIVAR_SENSOR",
            id_sensor: id_sensor,
            id_cliente: id_cliente,
            pesoFluido: gas_peso_max.pesoMaxFluido,
            pesoBruto: gas_peso_max.pesoBruto,
            pesoTara: gas_peso_max.pesoTara
        });
        
        return res.status(201).json({
            message:"Sensor cadastrado",
            id_sensor: id_sensor,
            id_cliente: id_cliente,
            pesoFluido: gas_peso_max.pesoMaxFluido,
            peso_bruto: gas_peso_max.pesoBruto,
            peso_tara: gas_peso_max.pesoTara
            
        });
    }catch(error: any){
        // console.error("Erro na inicialização do sensor", error.message);
        // return res.status(500).json({error: "Falha ao inicializar o sensor"});
        console.error("ERRO DETALHADO:", error.response ? error.response.data : error.message); // Adicione isso
        return res.status(500).json({
        error: "Falha ao inicializar o sensor",
        details: error.message // Isso vai te dizer se foi erro de banco ou de rede
    });
    }
}

export async function reinicializarSensor ( req: Request ,res: Response){
    try {
        const {id_sensor} = req.params;

        const renovar_gas_data_troca = await pool.query (`UPDATE Sensor SET data_ultima_troca = NOW(),
            status_uso = true,
            WHERE id_sensor = $1 RETURNING *`, [id_sensor]);

        if (renovar_gas_data_troca.rowCount === 0){
            return res.status(404).json({error: "Sensor não encontrado, não foi possivel reiniciar"});
        }

        const tipo_gas = renovar_gas_data_troca.rows[0].tipo_gas;

        const configPesos = await serviceSensor.pesoMaxBotijaoGas(tipo_gas);
        const { pesoTara, pesoMaxFluido, pesoBruto } = configPesos;

        const previsao_inicial = await serviceSensor.calcularPrevisaoPorNivel(
            pesoMaxFluido, 
            new Date(), 
            tipo_gas
        );

        await pool.query (
            'INSERT INTO Leitura_Sensor (id_sensor, peso_atual) VALUES ($1, $2)', 
            [id_sensor, 100]
        );

        const node_red_url = 'http://bfd_nodered:1880/sensor/reset';

        await axios.post (node_red_url, {
            message: "Botijão renovado com sucesso!",
            id_sensor: id_sensor,
            pesoBruto: pesoBruto,
            pesoTara: pesoTara,
            pesoFluido: pesoMaxFluido
        });

        return res.status(200).json ({
            message: "Botijão renovado com sucesso!",
            id_sensor: id_sensor,
            pesoBruto: pesoBruto,
            pesoFluido: pesoMaxFluido,
            previsao_dias: previsao_inicial
        });
    } catch(error: any) {
        console.error("Erro ao renovar o sensor", error.message);
        return res.status(500).json({error: "Falha ao renovar o ciclo do sensor"})
    }
}

export async function verficarEstadoCliente (req: Request, res: Response){
    try{
        const {id_cliente, id_sensor} = req.params;

        const cliente_info = await pool.query ('SELECT status_uso  FROM Sensor WHERE id_cliente = $1 AND id_sensor = $2 ', [id_cliente, id_sensor]);
        if (cliente_info.rowCount === 0) {
            return res.status(404).json ({error:"Cliente não encontrado"});

        }
        
        const status_uso = cliente_info.rows[0].status_uso;
        const status = status_uso ? "Renovado" : "Em espera";

        return res.status(200).json ({ status});

    }catch(error: any){
        console.error("Erro ao verificar estado:", error.message);
        return res.status(500).json({error: "Erro interno ao verificar estado"});
    }
}

export async function renovarStatusSensor (req:Request, res: Response){
    try{
        const {id_cliente} = req.params;
        const { id_sensor, status_uso} = req.body;
        const status = await pool.query ('UPDATE Sensor SET status_uso = $1 WHERE id_cliente = $2 AND id_sensor = $3 RETURNING *', [status_uso, id_cliente, id_sensor]);

        if (status.rowCount === 0){
            throw new Error ("Status não foi alterado");
        }
        return res.status(200).json ({message: "Status alterado com sucesso"});
        
    }catch (error){
        return res.status(500).json ({error: "Erro ao renovar status do sensor"});
    }
}

