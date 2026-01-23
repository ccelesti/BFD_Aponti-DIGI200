// import { Request , Response }  from "express";
// import { pool } from "../database/db";
// import { SensorMedicaoGas } from "../models";
// import axios from 'axios';

// export async function reinicializarSensor (res: Response, req: Request){

// }

// export async function leituraNivelSensor (res: Response, req: Request){
// try {
//     const {sensor_id, nivel_gas, hora_medicao} = req.body;
//     const atualizar_ultima_leitura_sensor = await pool.query ('INSERT INTO sensores ( ultima_leitura ) VALUES ( $1 ) ;', [nivel_gas]);

    

// }

// }

// export async function cadastrarNovoSensor (res: Response, req: Request){
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

//export async function verificarSensor (res:Response, req: Request){

// }


