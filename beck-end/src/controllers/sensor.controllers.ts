// import { Request , Response }  from "express";
// import { pool } from "../database/db";
// import { SensorMedicaoGas } from "../models";
// import axios from 'axios';
// import { calcularPrevisao } from "../services/sensor.services"


// export async function receberLeituraNivelSensor (res: Response, req: Request){
//  try {
//     const {id_sensor, nivel_atual} = req.body;

//     const sensor_info = await pool.query ('SELECT data_ultima_troca FROM SensorMedicaoGas WHERE id_sensor = $1', [id_sensor]);

//     if (sensor_info.rowCount === 0) return res.status (404).json ({error: "Sensor desconhecedio"});

//     const dias_restantes_gas = calcularPrevisao (Number(nivel_atual), sensor_info.rows[0].data_ultima_troca);

//     await pool.query('INSERT INTO LeituraSensor (id_sensor, nivel_atual, previsao_dias) VALUES ($1, $2, $3)', [id_sensor, nivel_atual, dias_restantes_gas]);
//     console.log (`Leitura salav: Id sensor: ${id_sensor} em ${nivel_atual}%. Previsão para acabar em ~${dias_restantes_gas} dias`);

//     return res.json ({succes: true, nova_previsao: dias_restantes_gas});

// }catch (error ){
//     return res.status(500).json ({error: "Erro ao processar leitura"});
// }
    
// }


// export async function cadastroNovoSensor (res: Response, req: Request){
    // try {
    //     //seria ideal eu ter aqui dentro também o id do endereço em especifico
    //     //para pegar o id do endereço seria bom colocar a função visualizarEnderecoCliente dentro de um arquivo dentro da pasta service 
    //     const { id_sensor, id_cliente , tipo_gas } = req.body;

    //     const query = 'INSERT INTO SENSORES (id_sensor, cliente_id, tipo_gas, data_inicio ) VALUES ($1, $2, $3, $3) RETURNING * ' 
    //     const novo_sensor = await pool.query (query , [id_sensor, id_cliente, tipo_gas, ultima_leitura]);

    //     const url_sensor_nodered = 'http://localhost:1880/iniciar-monitoramento'; 
           //url provavelmente destualizada, verificar;

    //     await axios.post(url_sensor_nodered, {
    //         mensagem: "ATIVAR_SENSOR",
    //         config: novo_sensor.rows[0]
    //     });

    //     res.status(201).json({
    //         message:"Sensor cadastrado",
    //         sensor: novo_sensor[0]
    //     });
    // }catch(error: any){
    //     console.error("Erro na inicialização do sensor", error.message);
    //     res.status(500).json({"Falha ao inicializar o sensor"});
    // }
// }

// export async function reinicializarSensor (res: Response, req: Request){
//     try {
//         const {id_sensor} = req.params;

//         const renovar_gas_data_troca = await pool.query (`UPDATE SensorMedicaoGas SET data_ultima_troca = NOW(),
//             ativo = true
//             WHERE id_sensor = $1 
//             RETURNING *`, [id_sensor]);

//             if (renovar_gas_data_troca.rowCount === 0){
//                 return res.status(404).json({error: "Sensor não encontrado, não foi possivel reiniciar"});
//             }

//             const node_red_url = 'http://bfd_nodered:1880/sensor/reset';

//             await axios.post (node_red_url, {
//                 message: "Botijão renovado com sucesso!",
//                 sensor: renovar_gas_data_troca.rows[0]
//             });

//             await pool.query ('INSERT INTO LeituraSensor (id_sensor, nivel_atual, previsao_dias) VALUES ($1, 100, 30', [id_sensor]);

//             return res.json ({
//                 message: "Botijão renovado com suceso!.",
//                 sensor: renovar_gas_data_troca.rows[0]
//             });
//     }catch(error: any){
//         console.error("Erro ao renovar o sensor", error.message);
//         return res.status(500).json({error: "FAlha ao renovar o ciclo do sensor"})

// }
// }

